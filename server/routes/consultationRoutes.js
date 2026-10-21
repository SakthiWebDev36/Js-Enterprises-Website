import express from 'express';
import mongoose from 'mongoose';
import Consultation from '../models/Consultation.js';

const router = express.Router();

/* ─────────────────────────────────────────────
   POST /api/consultations
   Submit a new consultation request
───────────────────────────────────────────── */
router.post('/', async (req, res) => {
  try {
    // Fast check: verify database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently connecting. Please ensure your current IP is whitelisted in MongoDB Atlas Network Access (or set to 0.0.0.0/0).',
        code: 'DB_DISCONNECTED'
      });
    }

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

    // Create and save the document (refId is auto-generated in the model)
    const consultation = new Consultation({
      name: name.trim(),
      company: company?.trim() || '',
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      service,
      scope: scope.trim(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || '',
    });

    const saved = await consultation.save();

    console.log(`[Consultation] New request saved → ${saved.refId} | ${saved.name} | ${saved.service}`);

    return res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully.',
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
  } catch (err) {
    // Mongoose duplicate key (race condition on refId)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A request with this reference ID already exists. Please try again.',
      });
    }

    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join('. '),
      });
    }

    console.error('[Consultation POST error]', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later or call us directly.',
    });
  }
});

/* ─────────────────────────────────────────────
   GET /api/consultations
   Retrieve all consultation requests (admin view)
   Supports: ?status=pending&service=Fire+Alarm+Systems
             &limit=20&page=1&sort=desc
───────────────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const {
      status,
      service,
      page = 1,
      limit = 20,
      sort = 'desc',
    } = req.query;

    const filter = {};
    if (status)  filter.status  = status;
    if (service) filter.service = service;

    const skip = (Number(page) - 1) * Number(limit);
    const sortOrder = sort === 'asc' ? 1 : -1;

    const [records, total] = await Promise.all([
      Consultation.find(filter)
        .sort({ submittedAt: sortOrder })
        .skip(skip)
        .limit(Number(limit))
        .select('-__v -ipAddress -userAgent'),
      Consultation.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
      data: records,
    });
  } catch (err) {
    console.error('[Consultation GET error]', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/* ─────────────────────────────────────────────
   GET /api/consultations/:refId
   Retrieve a single consultation by reference ID
───────────────────────────────────────────── */
router.get('/:refId', async (req, res) => {
  try {
    const record = await Consultation.findOne({ refId: req.params.refId }).select('-__v');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: `No consultation found with reference ID: ${req.params.refId}`,
      });
    }

    return res.json({ success: true, data: record });
  } catch (err) {
    console.error('[Consultation GET/:refId error]', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/* ─────────────────────────────────────────────
   PATCH /api/consultations/:refId/status
   Update consultation status and/or notes (admin)
   Body: { status: "reviewed" | "contacted" | ..., notes: "..." }
───────────────────────────────────────────── */
router.patch('/:refId/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const allowedStatuses = ['pending', 'reviewed', 'contacted', 'converted', 'closed'];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}`,
      });
    }

    const update = {};
    if (status) update.status = status;
    if (notes !== undefined) update.notes = notes;

    const updated = await Consultation.findOneAndUpdate(
      { refId: req.params.refId },
      { $set: update },
      { new: true, runValidators: true, select: '-__v' }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `No consultation found with reference ID: ${req.params.refId}`,
      });
    }

    console.log(`[Consultation] Status updated → ${updated.refId}: ${updated.status}`);

    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error('[Consultation PATCH error]', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/* ─────────────────────────────────────────────
   GET /api/consultations/stats/summary
   Aggregate summary counts per status
───────────────────────────────────────────── */
router.get('/stats/summary', async (req, res) => {
  try {
    const [statusCounts, serviceCounts, total] = await Promise.all([
      Consultation.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Consultation.aggregate([
        { $group: { _id: '$service', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Consultation.countDocuments(),
    ]);

    return res.json({
      success: true,
      data: {
        total,
        byStatus: Object.fromEntries(statusCounts.map(s => [s._id, s.count])),
        byService: serviceCounts.map(s => ({ service: s._id, count: s.count })),
      },
    });
  } catch (err) {
    console.error('[Consultation stats error]', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
