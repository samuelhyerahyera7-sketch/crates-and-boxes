const crypto = require('crypto');

function collectBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });
}

function parseBody(req, raw) {
  if (req.body && typeof req.body === 'object') return req.body;

  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('application/json')) return JSON.parse(raw || '{}');

  const params = new URLSearchParams(raw);
  return Object.fromEntries(params.entries());
}

function responseHash(fields, privateKey) {
  const hashInput = [
    fields.SiteCode,
    fields.TransactionId,
    fields.TransactionReference,
    fields.Amount,
    fields.Status,
    fields.Optional1,
    fields.Optional2,
    fields.Optional3,
    fields.Optional4,
    fields.Optional5,
    fields.CurrencyCode,
    fields.IsTest,
    fields.StatusMessage,
    privateKey,
  ].join('').toLowerCase();

  return crypto.createHash('sha512').update(hashInput).digest('hex');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const privateKey = process.env.OZOW_PRIVATE_KEY;
  if (!privateKey) return res.status(500).json({ error: 'Payment gateway not configured' });

  try {
    const raw = req.body && typeof req.body === 'object' ? '' : await collectBody(req);
    const body = parseBody(req, raw);
    const expectedHash = responseHash({
      SiteCode: body.SiteCode || '',
      TransactionId: body.TransactionId || '',
      TransactionReference: body.TransactionReference || '',
      Amount: body.Amount || '',
      Status: body.Status || '',
      Optional1: body.Optional1 || '',
      Optional2: body.Optional2 || '',
      Optional3: body.Optional3 || '',
      Optional4: body.Optional4 || '',
      Optional5: body.Optional5 || '',
      CurrencyCode: body.CurrencyCode || '',
      IsTest: body.IsTest || '',
      StatusMessage: body.StatusMessage || '',
    }, privateKey);

    const receivedHash = String(body.Hash || '').toLowerCase();
    const validHash = receivedHash.length === expectedHash.length &&
      crypto.timingSafeEqual(Buffer.from(receivedHash), Buffer.from(expectedHash));

    if (!validHash) {
      console.warn('Invalid Ozow notification hash', {
        transactionReference: body.TransactionReference,
        status: body.Status,
      });
      return res.status(400).json({ error: 'Invalid hash' });
    }

    console.log('Ozow notification received', {
      transactionId: body.TransactionId,
      transactionReference: body.TransactionReference,
      amount: body.Amount,
      status: body.Status,
      isTest: body.IsTest,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Ozow notification handler error:', err);
    return res.status(400).json({ error: 'Invalid notification' });
  }
};
