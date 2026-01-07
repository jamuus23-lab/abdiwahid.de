import express from 'express';
import axios from 'axios';
import { getCache, setCache } from '../utils/cache.js';

const router = express.Router();

const TRANSPORT_BASE = 'https://v6.transport.rest';

// GET /api/transport/station?query=NAME
// Searches for a station/location by name using transport.rest locations endpoint
router.get('/station', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: 'query parameter required' });

  const key = `station:${query}`;
  const cached = getCache(key);
  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(cached);
  }

  try {
    const r = await axios.get(`${TRANSPORT_BASE}/locations`, { params: { query } });
    setCache(key, r.data, 60 * 1000); // cache station search for 60s
    res.setHeader('X-Cache', 'MISS');
    return res.json(r.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    return res.status(500).json({ error: 'failed to fetch locations' });
  }
});

// GET /api/transport/departures?stopId=ID&duration=60
// Proxies departures for a given stop id (use station search first to get id)
router.get('/departures', async (req, res) => {
  const stopId = req.query.stopId;
  const duration = req.query.duration || 60;
  if (!stopId) return res.status(400).json({ error: 'stopId parameter required' });

  const key = `departures:${stopId}:${duration}`;
  const cached = getCache(key);
  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(cached);
  }

  try {
    const r = await axios.get(`${TRANSPORT_BASE}/stops/${encodeURIComponent(stopId)}/departures`, {
      params: { duration }
    });
    setCache(key, r.data, 15 * 1000); // cache departures for 15s
    res.setHeader('X-Cache', 'MISS');
    return res.json(r.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    return res.status(500).json({ error: 'failed to fetch departures' });
  }
});

export default router;
