import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RECEIPTS_DIR = path.join(__dirname, '../data/sent_receipts');

if (!fs.existsSync(RECEIPTS_DIR)) {
  fs.mkdirSync(RECEIPTS_DIR, { recursive: true });
}

/**
 * Sends consultation notification email with the generated PDF receipt attached.
 * @param {Object} ticketData
 * @param {Buffer} pdfBuffer
 */
export async function sendConsultationEmail(ticketData, pdfBuffer) {
  const recipient = process.env.DISPATCH_EMAIL || 'sakthiwebdev10@gmail.com';
  const pdfFilename = `JS-Enterprises-Consultation-${ticketData.refId}.pdf`;

  // Always save a copy to server/data/sent_receipts/
  try {
    const localPdfPath = path.join(RECEIPTS_DIR, pdfFilename);
    fs.writeFileSync(localPdfPath, pdfBuffer);
    console.log(`[Email Service] PDF receipt saved locally to ${localPdfPath}`);
  } catch (e) {
    console.warn('[Email Service] Failed saving local receipt backup:', e.message);
  }

  // Check if SMTP credentials exist
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f3f4f6; margin: 0; padding: 24px; }
      .container { max-width: 600px; margin: 0 auto; background-color: #111625; border: 1px solid #1e283d; border-radius: 12px; overflow: hidden; }
      .header { background-color: #0d121f; border-bottom: 2px solid #e6392f; padding: 20px 24px; }
      .brand { font-size: 18px; font-weight: bold; color: #ffffff; letter-spacing: 0.5px; }
      .subtitle { font-size: 11px; color: #94a3b8; font-family: monospace; text-transform: uppercase; margin-top: 2px; }
      .body { padding: 24px; }
      .badge { display: inline-block; background-color: rgba(230,57,47,0.15); border: 1px solid rgba(230,57,47,0.4); color: #e6392f; font-family: monospace; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 6px; margin-bottom: 16px; }
      .title { font-size: 20px; font-weight: bold; color: #ffffff; margin-top: 0; margin-bottom: 8px; }
      .intro { font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 20px; }
      .details-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
      .details-table td { padding: 10px 12px; border-bottom: 1px solid #1e283d; }
      .details-table td.label { width: 35%; color: #94a3b8; font-family: monospace; font-size: 11px; text-transform: uppercase; }
      .details-table td.value { color: #f3f4f6; font-weight: 500; }
      .scope-box { background-color: #090d16; border: 1px solid #1e283d; border-radius: 8px; padding: 14px; margin-bottom: 24px; font-size: 13px; line-height: 1.5; color: #cbd5e1; }
      .scope-title { font-size: 11px; font-family: monospace; color: #e6392f; text-transform: uppercase; margin-bottom: 6px; font-weight: bold; }
      .callout { background-color: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; padding: 12px 16px; color: #34d399; font-size: 12px; font-family: monospace; margin-bottom: 24px; }
      .footer { background-color: #090d16; border-top: 1px solid #1e283d; padding: 16px 24px; font-size: 11px; color: #64748b; font-family: monospace; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="brand">JS ENTERPRISES</div>
        <div class="subtitle">Fire Safety Engineering • Chennai Operations Hub</div>
      </div>
      <div class="body">
        <div class="badge">REF TICKET: ${ticketData.refId}</div>
        <h2 class="title">New Consultation Request Dispatched</h2>
        <p class="intro">
          A new fire safety consultation and on-site audit inquiry has been received through the website. The official PDF receipt is attached to this email.
        </p>

        <table class="details-table">
          <tr>
            <td class="label">Contact Person</td>
            <td class="value">${ticketData.name}</td>
          </tr>
          <tr>
            <td class="label">Company / Facility</td>
            <td class="value">${ticketData.company || 'Not Specified'}</td>
          </tr>
          <tr>
            <td class="label">Phone Number</td>
            <td class="value"><a href="tel:${ticketData.phone}" style="color: #e6392f; text-decoration: none; font-weight: bold;">${ticketData.phone}</a></td>
          </tr>
          <tr>
            <td class="label">Client Email</td>
            <td class="value"><a href="mailto:${ticketData.email}" style="color: #60a5fa; text-decoration: none;">${ticketData.email}</a></td>
          </tr>
          <tr>
            <td class="label">Primary Service</td>
            <td class="value">${ticketData.service}</td>
          </tr>
          <tr>
            <td class="label">Submission Time</td>
            <td class="value">${new Date(ticketData.submittedAt || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
          </tr>
        </table>

        <div class="scope-box">
          <div class="scope-title">Project Scope / Requirements</div>
          ${ticketData.scope}
        </div>

        <div class="callout">
          ✔ OFFICIAL PDF RECEIPT ATTACHED (${pdfFilename})
        </div>
      </div>
      <div class="footer">
        JS Enterprises • No. 16/35, Kamarajar Street, Srinivasa Nagar, Padi, Chennai - 600 055<br>
        24/7 Hotline: +91 99416 46332 | Office: 044-26561223 | jsbsafety@gmail.com
      </div>
    </div>
  </body>
  </html>
  `;

  // If no credentials, log the simulated dispatch with clear guidance
  if (!emailUser || !emailPass) {
    console.log('');
    console.log('  ┌────────────────────────────────────────────────────────────────────────┐');
    console.log(`  │ ✉ EMAIL DISPATCH LOGGED TO: ${recipient.padEnd(41)}│`);
    console.log(`  │ ► Reference Ticket: ${ticketData.refId.padEnd(49)}│`);
    console.log(`  │ ► Client Name:      ${ticketData.name.padEnd(49)}│`);
    console.log(`  │ ► Service:          ${ticketData.service.padEnd(49)}│`);
    console.log(`  │ ► Attached PDF:     ${pdfFilename.padEnd(49)}│`);
    console.log('  │                                                                        │');
    console.log('  │ To send LIVE real emails via Gmail SMTP, add to server/.env:           │');
    console.log('  │   EMAIL_USER=yourgmail@gmail.com                                       │');
    console.log('  │   EMAIL_PASS=xxxx xxxx xxxx xxxx (16-character Google App Password)    │');
    console.log('  │   DISPATCH_EMAIL=sakthiwebdev10@gmail.com                              │');
    console.log('  └────────────────────────────────────────────────────────────────────────┘');
    console.log('');
    return {
      success: true,
      mode: 'simulated_local',
      recipient,
      pdfFilename,
      message: 'PDF generated and email dispatch logged locally.'
    };
  }

  // Live SMTP Transporter
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const info = await transporter.sendMail({
      from: `"JS Enterprises Dispatch" <${emailUser}>`,
      to: recipient,
      subject: `[New Consultation] Ref: ${ticketData.refId} - ${ticketData.name} (${ticketData.service})`,
      html: emailHtml,
      attachments: [
        {
          filename: pdfFilename,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    console.log(`[Email Service] Live email successfully dispatched to ${recipient}: ${info.messageId}`);
    return {
      success: true,
      mode: 'live_smtp',
      messageId: info.messageId,
      recipient,
      pdfFilename
    };
  } catch (err) {
    console.error(`[Email Service] Failed sending live email to ${recipient}:`, err.message);
    return {
      success: false,
      error: err.message,
      recipient,
      pdfFilename
    };
  }
}
