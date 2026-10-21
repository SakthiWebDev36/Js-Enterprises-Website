import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Route imports
import consultationRoutes from './routes/consultationRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

/* ─────────────────────────────────────────────
   MIDDLEWARE
───────────────────────────────────────────── */
// CORS – allow frontend dev server and same origin
const allowedOrigins = [
  'http://localhost:5173',   // Vite dev server
  'http://localhost:4173',   // Vite preview
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
  'http://localhost:5000',   // Same origin preview
  process.env.CLIENT_URL,    // Production frontend URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, same-origin)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON bodies (max 1mb)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Real IP trust (for proxy/nginx deployment)
app.set('trust proxy', 1);

/* ─────────────────────────────────────────────
   ROUTES
───────────────────────────────────────────── */
app.use('/api/health', healthRoutes);
app.use('/api/consultations', consultationRoutes);

// API root
app.get('/api', (req, res) => {
  res.json({
    message: 'JS Enterprises Fire Safety API',
    version: '1.0.0',
    endpoints: {
      health:          'GET  /api/health',
      submitRequest:   'POST /api/consultations',
      listRequests:    'GET  /api/consultations',
      getByRef:        'GET  /api/consultations/:refId',
      updateStatus:    'PATCH /api/consultations/:refId/status',
      stats:           'GET  /api/consultations/stats/summary',
    },
  });
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
  }
  next();
});

/* ─────────────────────────────────────────────
   GLOBAL ERROR HANDLER
───────────────────────────────────────────── */
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  });
});

/* ─────────────────────────────────────────────
   START: Start Express listener immediately & connect DB
───────────────────────────────────────────── */
const server = app.listen(PORT, () => {
  console.log('');
  console.log('  ███████╗██╗███████╗███████╗    ███████╗ █████╗ ███████╗███████╗████████╗██╗   ██╗');
  console.log('  ██╔════╝██║██╔════╝██╔════╝    ██╔════╝██╔══██╗██╔════╝██╔════╝╚══██╔══╝╚██╗ ██╔╝');
  console.log('  █████╗  ██║█████╗  █████╗      ███████╗███████║█████╗  █████╗     ██║    ╚████╔╝ ');
  console.log('  ██╔══╝  ██║██╔══╝  ██╔══╝      ╚════██║██╔══██║██╔══╝  ██╔══╝     ██║     ╚██╔╝  ');
  console.log('  ██║     ██║███████╗███████╗    ███████║██║  ██║██║     ███████╗   ██║      ██║   ');
  console.log('  ╚═╝     ╚═╝╚══════╝╚══════╝    ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝   ╚═╝      ╚═╝   ');
  console.log('');
  console.log(`  JS Enterprises Fire Safety API`);
  console.log(`  ► Server : http://localhost:${PORT}`);
  console.log(`  ► API    : http://localhost:${PORT}/api`);
  console.log(`  ► Health : http://localhost:${PORT}/api/health`);
  console.log(`  ► Mode   : ${process.env.NODE_ENV || 'development'}`);
  console.log('');

  // Connect MongoDB in background
  connectDB();
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[Startup] Port ${PORT} is already in use. Kill process or change PORT in .env.`);
  } else {
    console.error('[Startup Error]', err.message);
  }
  process.exit(1);
});
