module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://www.cratesandboxes.co.za');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const clientId     = process.env.OZOW_CLIENT_ID;
  const clientSecret = process.env.OZOW_CLIENT_SECRET;
  const siteCode     = process.env.OZOW_SITE_CODE;

  if (!clientId || !clientSecret || !siteCode) {
    return res.status(500).json({ error: 'Payment gateway not configured' });
  }

  try {
    // Step 1: Get OAuth access token
    const tokenRes = await fetch('https://one.ozow.com/v1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id:     clientId,
        client_secret: clientSecret,
        scope:         'payment',
        grant_type:    'client_credentials',
      }).toString(),
    });

    if (!tokenRes.ok) {
      const detail = await tokenRes.text();
      console.error('Ozow token error:', detail);
      return res.status(502).json({ error: 'Could not connect to payment gateway', detail });
    }

    const { access_token } = await tokenRes.json();

    // Step 2: Create payment request
    const merchantReference = `CAB-${Date.now()}`;
    const expireAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 min

    const paymentRes = await fetch('https://one.ozow.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        siteCode,
        amount: { currency: 'ZAR', value: amount },
        merchantReference,
        expireAt,
        returnUrl: 'https://www.cratesandboxes.co.za/payment-return.html',
      }),
    });

    if (!paymentRes.ok) {
      const detail = await paymentRes.text();
      console.error('Ozow payment error:', detail);
      return res.status(502).json({ error: 'Could not create payment', detail });
    }

    const payment = await paymentRes.json();

    return res.status(200).json({
      redirectUrl: payment.redirectUrl,
      paymentId:   payment.id,
      reference:   merchantReference,
    });

  } catch (err) {
    console.error('Payment handler error:', err);
    return res.status(500).json({ error: err.message });
  }
};
