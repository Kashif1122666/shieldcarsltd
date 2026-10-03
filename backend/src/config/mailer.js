import nodemailer from 'nodemailer';

/**
 * Email notifications for new inquiries.
 *
 * Configured entirely through environment variables. If SMTP is not configured
 * the app keeps working: inquiries are still saved to MongoDB and a warning is
 * logged. Add the SMTP_* values in backend/.env to start sending.
 */

let transporter = null;

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function mailFrom() {
  return process.env.MAIL_FROM || `Shield Cars Ltd <${process.env.SMTP_USER}>`;
}

function notifyRecipients() {
  const raw = process.env.NOTIFY_EMAIL || process.env.SMTP_USER || '';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function getTransporter() {
  if (transporter) return transporter;

  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? String(process.env.SMTP_SECURE).toLowerCase() === 'true'
      : port === 465;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const TYPE_LABELS = {
  general: 'General Inquiry',
  vehicle: 'Vehicle Inquiry',
  test_drive: 'Test Drive Request',
  trade_in: 'Trade-In Valuation',
  financing: 'Finance Inquiry',
};

function buildRows(inquiry) {
  const rows = [
    ['Name', inquiry.fullName],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone],
    ['Inquiry Type', TYPE_LABELS[inquiry.type] || inquiry.type],
    ['Vehicle', inquiry.vehicleTitle],
    ['Preferred Date', inquiry.preferredDate],
  ];

  if (inquiry.tradeInDetails) {
    const t = inquiry.tradeInDetails;
    rows.push(['Trade-In', [t.make, t.model, t.year, t.mileage ? `${t.mileage} miles` : null].filter(Boolean).join(' ')]);
  }

  return rows.filter(([, v]) => v !== undefined && v !== null && v !== '');
}

function buildHtml(inquiry) {
  const rows = buildRows(inquiry)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;font-size:13px;font-weight:600;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f5f5;padding:24px;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
      <div style="background:#0b0b0d;padding:20px 24px;">
        <h1 style="margin:0;color:#ffffff;font-size:18px;">New Inquiry — Shield Cars Ltd</h1>
      </div>
      <div style="padding:8px 12px 4px;">
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
      </div>
      <div style="padding:16px 24px 24px;">
        <div style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Message</div>
        <div style="white-space:pre-wrap;color:#111;font-size:14px;line-height:1.6;background:#fafafa;border:1px solid #eee;border-radius:8px;padding:12px;">${escapeHtml(inquiry.message || '(no message)')}</div>
      </div>
      <div style="padding:0 24px 24px;color:#999;font-size:12px;">
        Submitted ${escapeHtml(inquiry.createdAt || new Date().toISOString())} · Reference ${escapeHtml(inquiry.id || '')}
      </div>
    </div>
  </div>`;
}

function buildText(inquiry) {
  const lines = buildRows(inquiry).map(([label, value]) => `${label}: ${value}`);
  lines.push('', 'Message:', inquiry.message || '(no message)');
  lines.push('', `Reference: ${inquiry.id || ''}`);
  return lines.join('\n');
}

/**
 * Sends the staff notification for a new inquiry.
 * Never throws — logs and resolves so the API response is unaffected.
 */
export async function sendInquiryNotification(inquiry) {
  if (!isMailConfigured()) {
    console.warn('[mailer] SMTP not configured; skipping email for inquiry', inquiry.id);
    return { sent: false, reason: 'not-configured' };
  }

  const recipients = notifyRecipients();
  if (!recipients.length) {
    console.warn('[mailer] No NOTIFY_EMAIL/SMTP_USER recipient; skipping email');
    return { sent: false, reason: 'no-recipient' };
  }

  const subject = `New ${TYPE_LABELS[inquiry.type] || 'Inquiry'} — ${inquiry.fullName}${
    inquiry.vehicleTitle ? ` (${inquiry.vehicleTitle})` : ''
  }`;

  try {
    const info = await getTransporter().sendMail({
      from: mailFrom(),
      to: recipients,
      replyTo: inquiry.email ? `${inquiry.fullName} <${inquiry.email}>` : undefined,
      subject,
      text: buildText(inquiry),
      html: buildHtml(inquiry),
    });
    console.log('[mailer] Inquiry notification sent:', info.messageId);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error('[mailer] Failed to send inquiry notification:', err.message);
    return { sent: false, reason: err.message };
  }
}
