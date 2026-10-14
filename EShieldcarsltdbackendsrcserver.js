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

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Unknown API routes should return JSON, not the SPA fallback.
app.use('/api', (_req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

module.exports = app;
