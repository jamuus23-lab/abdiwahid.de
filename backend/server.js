#!/usr/bin/env node
import dotenv from 'dotenv';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import transportRouter from './routes/transport.js';
import nnRouter from './routes/nn.js';

// Load environment variables from .env in development
dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

// Basic rate limiter to reduce accidental abuse of proxied APIs.
const apiLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 30, // limit each IP to 30 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.get('/', (req, res) => res.type('text').send('abdiwahid-transit-backend running'));
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.get('/api/ping', (req, res) => res.json({ message: 'pong' }));

// Mount API routers with rate limiting
app.use('/api/transport', apiLimiter, transportRouter);
app.use('/api/9292', apiLimiter, nnRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
