import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

/* ─────────────────────────────────────────────
   GET /api/health
   Server and database health check
───────────────────────────────────────────── */
router.get('/', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

  return res.json({
    success: true,
    server: 'JS Enterprises API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    database: {
      status: dbStateMap[dbState] || 'unknown',
      host: mongoose.connection.host || 'N/A',
      name: mongoose.connection.name || 'N/A',
    },
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

export default router;
