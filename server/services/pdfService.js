import { jsPDF } from 'jspdf';

/**
 * Generates an official PDF Consultation Receipt buffer on the server.
 * @param {Object} ticketData
 * @returns {Buffer} PDF binary buffer
 */
export function generatePdfBuffer(ticketData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // 1. TOP BRAND BANNER (Dark Navy + Fire Red Accent)
  doc.setFillColor(14, 19, 31);
  doc.rect(0, 0, pageWidth, 44, 'F');

  // Fiery Red Accent Stripe
  doc.setFillColor(230, 57, 47);
  doc.rect(0, 43, pageWidth, 2, 'F');

  // Company Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('JS ENTERPRISES', 16, 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(220, 225, 235);
  doc.text('CERTIFIED FIRE SAFETY ENGINEERING & CONTRACTING SOLUTIONS', 16, 23);

  doc.setFontSize(7.5);
  doc.setTextColor(165, 175, 190);
  doc.text('No. 16/35, Kamarajar Street, Srinivasa Nagar, Padi, Chennai - 600 055, Tamil Nadu, India', 16, 29);
  doc.text('Hotline: +91 99416 46332 | Office: 044-26561223 | Email: jsbsafety@gmail.com', 16, 34);

  // Right Badge: Regulatory Compliance
  doc.setFillColor(230, 57, 47);
  doc.roundedRect(pageWidth - 68, 12, 52, 20, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('TNFRS & NBC', pageWidth - 42, 20, { align: 'center' });
  doc.setFontSize(6.8);
  doc.text('STANDARDS COMPLIANT', pageWidth - 42, 25, { align: 'center' });

  // 2. RECEIPT TITLE & REFERENCE TICKET
  let y = 54;
  doc.setTextColor(20, 25, 35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('OFFICIAL CONSULTATION & AUDIT DISPATCH RECEIPT', 16, y);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(110, 120, 135);
  const dateStr = ticketData?.submittedAt 
    ? new Date(ticketData.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  doc.text(`Generated: ${dateStr}`, pageWidth - 16, y, { align: 'right' });

  y += 7;
  // Ticket Reference Bar
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(220, 225, 235);
  doc.roundedRect(16, y, pageWidth - 32, 14, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(230, 57, 47);
  doc.text(`REFERENCE TICKET ID: ${ticketData?.refId || 'JSE-CONFIRM'}`, 22, y + 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(16, 185, 129);
  doc.text('STATUS: DISPATCHED TO OPERATIONS DESK', pageWidth - 22, y + 9, { align: 'right' });

  // 3. CLIENT & FACILITY SPECIFICATIONS
  y += 22;
  doc.setTextColor(20, 25, 35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('1. CLIENT & PREMISES SPECIFICATIONS', 16, y);

  y += 4;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(220, 225, 235);
  doc.roundedRect(16, y, pageWidth - 32, 44, 2, 2, 'D');

  const drawField = (label, value, xPos, yPos) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(120, 130, 145);
    doc.text(label.toUpperCase(), xPos, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(25, 30, 40);
    const safeVal = String(value || 'Not Specified');
    doc.text(safeVal, xPos, yPos + 5);
  };

  drawField('Contact Person', ticketData?.name, 22, y + 8);
  drawField('Company / Facility Name', ticketData?.company, 110, y + 8);

  drawField('Contact Phone Number', ticketData?.phone, 22, y + 22);
  drawField('Email Address', ticketData?.email, 110, y + 22);

  drawField('Primary Service Requested', ticketData?.service, 22, y + 36);
  drawField('Assigned Dispatch Base', 'Padi Operations Hub, Chennai - 600 055', 110, y + 36);

  // 4. PROJECT SCOPE / REQUIREMENTS
  y += 52;
  doc.setTextColor(20, 25, 35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('2. PROJECT SCOPE & AUDIT REQUIREMENTS', 16, y);

  y += 4;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(220, 225, 235);
  doc.roundedRect(16, y, pageWidth - 32, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(50, 60, 75);
  const scopeText = ticketData?.scope || 'Engineering site survey and fire safety audit consultation.';
  const splitScope = doc.splitTextToSize(scopeText, pageWidth - 44);
  doc.text(splitScope, 22, y + 8);

  // 5. NEXT OPERATIONAL ACTIONS
  y += 42;
  doc.setTextColor(20, 25, 35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('3. NEXT OPERATIONAL ACTIONS', 16, y);

  y += 4;
  const steps = [
    { n: '01', t: 'Technical Assessment', d: 'Engineers review facility area & applicable NBC occupancy classification within 2 hours.' },
    { n: '02', t: 'Premises Walkthrough', d: 'Field engineer coordinates physical site walkthrough & pressure feasibility audit.' },
    { n: '03', t: 'Itemized BOQ Proposal', d: 'Comprehensive CAD blueprint & statutory bill-of-quantities provided for clearance.' }
  ];

  steps.forEach((st, idx) => {
    const boxX = 16 + idx * 59.5;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220, 225, 235);
    doc.roundedRect(boxX, y, 57, 34, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(230, 57, 47);
    doc.text(`// ${st.n}`, boxX + 4, y + 7);

    doc.setFontSize(8);
    doc.setTextColor(20, 25, 35);
    doc.text(st.t, boxX + 4, y + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(90, 100, 115);
    const dLines = doc.splitTextToSize(st.d, 49);
    doc.text(dLines, boxX + 4, y + 19);
  });

  // 6. FOOTER
  y = pageHeight - 34;
  doc.setFillColor(245, 247, 250);
  doc.rect(0, y, pageWidth, 34, 'F');

  doc.setDrawColor(220, 225, 235);
  doc.line(0, y, pageWidth, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(40, 50, 65);
  doc.text('JS ENTERPRISES • EMERGENCY DISPATCH & SITE OPERATIONS DESK', 16, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 135);
  doc.text('Headquarters: No. 16/35, Kamarajar Street, Srinivasa Nagar, Padi, Chennai - 600 055, Tamil Nadu, India.', 16, y + 14);
  doc.text('24/7 Hotline: +91 99416 46332 | Office Landline: 044-26561223 | Website: www.jsenterpriseschennai.com', 16, y + 19);
  doc.text('This document is a certified electronic consultation dispatch record issued by JS Enterprises.', 16, y + 25);

  return Buffer.from(doc.output('arraybuffer'));
}
