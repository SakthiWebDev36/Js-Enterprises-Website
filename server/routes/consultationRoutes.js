import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Consultation from '../models/Consultation.js';
import { generatePdfBuffer } from '../services/pdfService.js';
import { sendConsultationEmail } from '../services/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OFFLINE_FILE = path.join(__dirname, '../data/consultations_offline.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper to read offline consultations
function getOfflineConsultations() {
  try {
    if (fs.existsSync(OFFLINE_FILE)) {
      const data = fs.readFileSync(OFFLINE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('[Storage] Error reading offline consultations:', err.message);
  }
  return [];
}

// Helper to save offline consultation
function saveOfflineConsultation(record) {
  try {
    const list = getOfflineConsultations();
    list.unshift(record);
    fs.writeFileSync(OFFLINE_FILE, JSON.stringify(list, null, 2), 'utf-8');
    console.log(`[Storage] Saved consultation to offline queue: ${record.refId}`);
    return true;
  } catch (err) {
    console.error('[Storage] Error saving offline consultation:', err.message);
    return false;
  }
}

// Background syncer: when MongoDB connects, flush offline queue into MongoDB
async function syncOfflineQueueToMongo() {
  if (mongoose.connection.readyState !== 1) return;
  const list = getOfflineConsultations();
  if (list.length === 0) return;

  console.log(`[Sync] Found ${list.length} offline consultations. Syncing to MongoDB Atlas...`);
  const remaining = [];

  for (const item of list) {
    try {
      const exists = await Consultation.findOne({ refId: item.refId });
      if (!exists) {
        await Consultation.create(item);
        console.log(`[Sync] Synced ${item.refId} to MongoDB Atlas.`);
      }
    } catch (err) {
      console.error(`[Sync] Failed to sync ${item.refId}:`, err.message);
      remaining.push(item);
    }
  }

  try {
    fs.writeFileSync(OFFLINE_FILE, JSON.stringify(remaining, null, 2), 'utf-8');
  } catch (e) {}
}

// Periodically check and sync when DB is connected
setInterval(() => {
  if (mongoose.connection.readyState === 1) {
    syncOfflineQueueToMongo();
  }
}, 15000);

const router = express.Router();

/* ─────────────────────────────────────────────
   POST /api/consultations
   Submit a new consultation request
   (Saves to MongoDB Atlas if connected, or falls back to robust local store)
───────────────────────────────────────────── */
router.post('/', async (req, res) => {
  try {
    const { name, company, phone, email, service, scope } = req.body;

    // Basic required field validation
    const missing = [];
    if (!name?.trim())    missing.push('name');
    if (!phone?.trim())   missing.push('phone');
    if (!email?.trim())   missing.push('email');
    if (!service?.trim()) missing.push('service');
    if (!scope?.trim())   missing.push('scope');

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`,
        missingFields: missing,
      });
    }

    const rand = Math.floor(100000 + Math.random() * 900000);
    const refId = `JSE-${rand}`;

    const newRecord = {
      refId,
      name: name.trim(),
      company: company?.trim() || '',
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      service,
      scope: scope.trim(),
      status: 'pending',
      submittedAt: new Date(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || '',
    };

    // Generate official PDF receipt buffer
    let pdfBuffer = null;
    try {
      pdfBuffer = generatePdfBuffer(newRecord);
    } catch (pdfErr) {
      console.warn('[Consultation] Error generating PDF receipt buffer:', pdfErr.message);
    }

    // Dispatch email with attached PDF to sakthiwebdev10@gmail.com
    let emailStatus = null;
    if (pdfBuffer) {
      try {
        emailStatus = await sendConsultationEmail(newRecord, pdfBuffer);
      } catch (emailErr) {
        console.error('[Consultation] Email dispatch error:', emailErr.message);
      }
    }

    // If MongoDB is connected, save directly to Atlas
    if (mongoose.connection.readyState === 1) {
      const consultation = new Consultation(newRecord);
      const saved = await consultation.save();
      console.log(`[Consultation] Saved to MongoDB Atlas → ${saved.refId} | ${saved.name}`);

      return res.status(201).json({
        success: true,
        storage: 'mongodb_atlas',
        emailStatus: emailStatus?.mode || 'pending',
        message: 'Consultation request submitted successfully and dispatched to engineering team.',
        data: {
          refId: saved.refId,
          name: saved.name,
          company: saved.company,
          phone: saved.phone,
          email: saved.email,
          service: saved.service,
          scope: saved.scope,
          status: saved.status,
          submittedAt: saved.submittedAt,
        },
      });
    }

    // Fallback: Save to reliable local store while Atlas IP whitelist is pending
    saveOfflineConsultation(newRecord);
    console.log(`[Consultation] Saved to Local Store (Atlas sync pending) → ${newRecord.refId} | ${newRecord.name}`);

    return res.status(201).json({
      success: true,
      storage: 'local_queue',
      emailStatus: emailStatus?.mode || 'pending',
      message: 'Consultation request received, PDF generated, and dispatched to engineering team.',
      data: {
        refId: newRecord.refId,
        name: newRecord.name,
        company: newRecord.company,
        phone: newRecord.phone,
        email: newRecord.email,
        service: newRecord.service,
        scope: newRecord.scope,
        status: newRecord.status,
        submittedAt: newRecord.submittedAt,
      },
    });

  } catch (err) {
    console.error('[Consultation POST error]', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while processing request.',
    });
  }
});

/* ─────────────────────────────────────────────
   GET /api/consultations
   Retrieve all consultation requests
───────────────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const records = await Consultation.find().sort({ submittedAt: -1 }).limit(50);
      return res.json({ success: true, count: records.length, data: records });
    }

    // Fallback to offline list
    const offlineList = getOfflineConsultations();
    return res.json({ success: true, count: offlineList.length, storage: 'offline_store', data: offlineList });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
