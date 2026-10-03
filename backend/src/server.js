import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import carRoutes from './routes/cars.js';
import inquiryRoutes from './routes/inquiries.js';
import { requireMongoUri, configureDns, mongoClientOptions } from './config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load backend/.env regardless of the current working directory.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// In production the Express server also serves the built frontend in ../frontend/dist.
const clientDist = path.resolve(__dirname, '../../frontend/dist');
const hasClientBuild = fs.existsSync(path.join(clientDist, 'index.html'));

const app = express();

// Behind a reverse proxy (Render, Railway, Nginx, etc.) honour X-Forwarded-* headers.
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
  });
});

// When no frontend build is present, expose a small status message at the root.
if (!hasClientBuild) {
  app.get('/', (_req, res) => {
    res.json({ message: 'Shield Cars API is running' });
  });
}

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Unknown API routes should return JSON, not the SPA fallback.
app.use('/api', (_req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Serve the built frontend (single-page app) when available.
if (hasClientBuild) {
  app.use(
    express.static(clientDist, {
      index: false,
      setHeaders(res, filePath) {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          // Vite emits content-hashed asset filenames: safe to cache forever.
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
          res.setHeader('Cache-Control', 'no-cache');
        }
      },
    })
  );

  // SPA fallback: send index.html for client-side routes, but not for
  // requests that look like missing static files.
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (path.extname(req.path)) return next();
    res.sendFile(path.join(clientDist, 'index.html'), { headers: { 'Cache-Control': 'no-cache' } });
  });
}

// Central error handler.
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

let MONGO_URI;
let mongoOptions;
try {
  MONGO_URI = requireMongoUri();
  const dnsMode = configureDns();
  if (dnsMode) console.log('DNS strategy:', dnsMode);
  mongoOptions = mongoClientOptions();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, mongoOptions)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(hasClientBuild ? 'Serving frontend from frontend/dist' : 'Frontend build not found (API only)');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
