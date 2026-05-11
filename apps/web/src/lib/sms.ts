// ============================================================
// SMS RELAY — Twilio-backed chat SMS delivery
// Zero Homeless Initiative Hub · zerofoundationusa.org
// ============================================================

export async function sendSMSRelay(to: string, message: string, fromName: string): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn('Twilio credentials not configured');
    return false;
  }

  const body = `[The Zero Homeless Initiative] Message from ${fromName}: ${message}`;
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ To: to, From: fromNumber, Body: body }).toString(),
  });

  return res.ok;
}
