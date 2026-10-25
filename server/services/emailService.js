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
 * Dispatches to both the operations desk (sakthiwebdev10@gmail.com, jsbsafety@gmail.com)
 * AND sends an official acknowledgment copy to the client (ticketData.email).
 * 
 * @param {Object} ticketData
 * @param {Buffer} pdfBuffer
 */
export async function sendConsultationEmail(ticketData, pdfBuffer) {
  const pdfFilename = `JS-Enterprises-Consultation-${ticketData.refId}.pdf`;

  // Always save a local copy to server/data/sent_receipts/
  try {
    const localPdfPath = path.join(RECEIPTS_DIR, pdfFilename);
    fs.writeFileSync(localPdfPath, pdfBuffer);
    console.log(`[Email Service] PDF receipt saved locally to ${localPdfPath}`);
  } catch (e) {
    console.warn('[Email Service] Failed saving local receipt backup:', e.message);
  }

  // Resilient SMTP credentials with fallback for cloud deployment (Render)
  const emailUser = (process.env.EMAIL_USER || 'sakthishwaran961@gmail.com').trim();
  const rawPass = (process.env.EMAIL_PASS || 'sucd brpw iboa rwie').trim();
  const emailPass = rawPass.replace(/\s+/g, ''); // Ensure 16-char app password without spaces

  // Destination list: ensure both engineering admins receive the alert
  const adminRecipients = [
    'sakthiwebdev10@gmail.com',
    'jsbsafety@gmail.com',
    process.env.DISPATCH_EMAIL,
  ].filter(Boolean);

  const uniqueAdminRecipients = [...new Set(adminRecipients)].join(', ');

  const adminEmailHtml = `
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
        <h2 class="title">New Consultation Request Received</h2>
        <p class="intro">
          A new fire safety consultation and on-site inspection request has been logged through the website.
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

  const clientEmailHtml = `
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
      .badge { display: inline-block; background-color: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.4); color: #10b981; font-family: monospace; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 6px; margin-bottom: 16px; }
      .title { font-size: 20px; font-weight: bold; color: #ffffff; margin-top: 0; margin-bottom: 8px; }
      .intro { font-size: 13px; color: #94a3b8; line-height: 1.6; margin-bottom: 20px; }
      .callout { background-color: rgba(230,57,47,0.1); border: 1px solid rgba(230,57,47,0.3); border-radius: 8px; padding: 14px 16px; color: #f87171; font-size: 12px; margin-bottom: 24px; line-height: 1.5; }
      .footer { background-color: #090d16; border-top: 1px solid #1e283d; padding: 16px 24px; font-size: 11px; color: #64748b; font-family: monospace; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="brand">JS ENTERPRISES</div>
        <div class="subtitle">Fire Safety Engineering • Chennai</div>
      </div>
      <div class="body">
        <div class="badge">REFERENCE: ${ticketData.refId}</div>
        <h2 class="title">Consultation Request Confirmed</h2>
        <p class="intro">
          Dear <strong>${ticketData.name}</strong>,<br><br>
          Thank you for reaching out to JS Enterprises. Your consultation request for <strong>${ticketData.service}</strong> has been routed to our Chennai engineering operations desk.
          Our field engineering team will review your requirements and reach out within 2 business hours.
        </p>

        <div class="callout">
          <strong>Official Consultation Receipt:</strong><br>
          Your official PDF consultation confirmation receipt (<strong>${pdfFilename}</strong>) is attached to this email for your records.
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

  // Establish robust direct SSL connection via port 465
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 1. Dispatch notification to Operations Desk (sakthiwebdev10@gmail.com & jsbsafety@gmail.com)
    const adminInfo = await transporter.sendMail({
      from: `"JS Enterprises Dispatch" <${emailUser}>`,
      to: uniqueAdminRecipients,
      subject: `[New Consultation] Ref: ${ticketData.refId} - ${ticketData.name} (${ticketData.service})`,
      html: adminEmailHtml,
      attachments: [
        {
          filename: pdfFilename,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    console.log(`[Email Service] Live email successfully dispatched to admin team (${uniqueAdminRecipients}): ${adminInfo.messageId}`);

    // 2. Dispatch confirmation receipt to the client's email if valid
    let clientInfo = null;
    if (ticketData.email && ticketData.email.includes('@') && !ticketData.email.includes('example.com')) {
      try {
        clientInfo = await transporter.sendMail({
          from: `"JS Enterprises Life Safety" <${emailUser}>`,
          to: ticketData.email,
          subject: `Consultation Request Received - Ref: ${ticketData.refId} | JS Enterprises`,
          html: clientEmailHtml,
          attachments: [
            {
              filename: pdfFilename,
              content: pdfBuffer,
              contentType: 'application/pdf',
            },
          ],
        });
        console.log(`[Email Service] Confirmation receipt successfully dispatched to client (${ticketData.email}): ${clientInfo.messageId}`);
      } catch (clientErr) {
        console.warn(`[Email Service] Notice: Could not send client confirmation to ${ticketData.email}:`, clientErr.message);
      }
    }

    return {
      success: true,
      mode: 'live_smtp',
      adminMessageId: adminInfo.messageId,
      clientMessageId: clientInfo ? clientInfo.messageId : null,
      adminRecipients: uniqueAdminRecipients,
      clientRecipient: ticketData.email,
      pdfFilename,
    };
  } catch (err) {
    console.error(`[Email Service Error] Failed sending live email:`, err.message);
    return {
      success: false,
      error: err.message,
      pdfFilename,
    };
  }
}
