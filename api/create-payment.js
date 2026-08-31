const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://www.cratesandboxes.co.za';
const RETURN_URL = `${SITE_ORIGIN}/payment-return.html`;
const NOTIFY_URL = `${SITE_ORIGIN}/api/ozow-notify`;

function setCors(req, res) {
  const origin = req.headers.origin || '';
  const allowed = new Set([
    SITE_ORIGIN,
    'https://cratesandboxes.co.za',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ]);

  if (allowed.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', SITE_ORIGIN);
  }

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function formatAmount(amount) {
  return Number(amount).toFixed(2);
}

function toOzowBool(value) {
  return value === 'true' || value === true ? 'true' : 'false';
}

function hashFields(fields, privateKey) {
  const hashInput = [
    fields.SiteCode,
    fields.CountryCode,
    fields.CurrencyCode,
    fields.Amount,
    fields.TransactionReference,
    fields.BankReference,
    fields.Optional1,
    fields.Optional2,
    fields.Optional3,
    fields.Optional4,
    fields.Optional5,
    fields.Customer,
    fields.CancelUrl,
    fields.ErrorUrl,
    fields.SuccessUrl,
    fields.NotifyUrl,
    fields.IsTest,
    privateKey,
  ].join('').toLowerCase();

  return crypto.createHash('sha512').update(hashInput).digest('hex');
}

function loadProducts() {
  const dataPath = path.join(process.cwd(), 'js', 'data.js');
  const source = fs.readFileSync(dataPath, 'utf8');
  return vm.runInNewContext(`${source}\nPRODUCTS;`, {}, { filename: dataPath });
}

function calculateOrder(cartItems) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error('Your cart is empty.');
  }

  const products = loadProducts();
  let total = 0;
  const lines = [];

  for (const item of cartItems) {
    const id = Number(item.id);
    const qty = Number(item.qty);

    if (!Number.isInteger(id) || !Number.isInteger(qty) || qty < 1 || qty > 99) {
      throw new Error('Invalid cart item.');
    }

    const product = products.find((p) => p.id === id);
    if (!product) throw new Error('A cart item is no longer available.');

    total += Number(product.price) * qty;
    lines.push(`${qty}x ${product.name}`);
  }

  return {
    amount: Math.round(total * 100) / 100,
    summary: lines.join(', ').slice(0, 50),
  };
}

async function readOzowResponse(response) {
  const location = response.headers.get('location');
  if (location) {
    return {
      redirectUrl: new URL(location, 'https://pay.ozow.com').toString(),
    };
  }

  const text = await response.text();
  let payload = null;

  try {
    payload = JSON.parse(text);
  } catch {
    payload = null;
  }

  const redirectUrl = payload?.url || payload?.redirectUrl || payload?.paymentUrl;
  if (redirectUrl) {
    return {
      redirectUrl,
      paymentRequestId: payload.paymentRequestId || payload.requestId || payload.id,
    };
  }

  if (!response.ok) {
    throw new Error(payload?.errorMessage || payload?.message || text || 'Ozow rejected the payment request.');
  }

  throw new Error('Ozow did not return a payment link.');
}

module.exports = async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const siteCode = process.env.OZOW_SITE_CODE;
  const apiKey = process.env.OZOW_API_KEY;
  const privateKey = process.env.OZOW_PRIVATE_KEY;
  const isTest = toOzowBool(process.env.OZOW_IS_TEST || 'false');

  if (!siteCode || !apiKey || !privateKey) {
    return res.status(500).json({ error: 'Payment gateway not configured' });
  }

  try {
    const requestBody = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
    const order = calculateOrder(requestBody?.items);
    if (order.amount <= 0) return res.status(400).json({ error: 'Invalid order amount' });

    const reference = `CAB-${Date.now()}`;
    const fields = {
      SiteCode: siteCode,
      CountryCode: 'ZA',
      CurrencyCode: 'ZAR',
      Amount: formatAmount(order.amount),
      TransactionReference: reference,
      BankReference: reference.slice(0, 20),
      Optional1: order.summary,
      Optional2: '',
      Optional3: '',
      Optional4: '',
      Optional5: '',
      Customer: '',
      CancelUrl: `${RETURN_URL}?status=cancelled`,
      ErrorUrl: `${RETURN_URL}?status=error`,
      SuccessUrl: `${RETURN_URL}?status=success`,
      NotifyUrl: NOTIFY_URL,
      IsTest: isTest,
    };

    fields.HashCheck = hashFields(fields, privateKey);

    const ozowResponse = await fetch('https://pay.ozow.com', {
      method: 'POST',
      redirect: 'manual',
      headers: {
        ApiKey: apiKey,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(fields).toString(),
    });

    const payment = await readOzowResponse(ozowResponse);

    return res.status(200).json({
      redirectUrl: payment.redirectUrl,
      paymentRequestId: payment.paymentRequestId,
      reference,
      amount: order.amount,
    });
  } catch (err) {
    console.error('Payment handler error:', err);
    const message = err.message || 'Could not create payment';
    return res.status(message.includes('cart') ? 400 : 502).json({ error: message });
  }
};
