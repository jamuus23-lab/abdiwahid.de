import express from 'express';
import axios from 'axios';
import { getCache, setCache } from '../utils/cache.js';

const router = express.Router();

// Placeholder for 9292 integration.
// 9292 offers APIs with different access rules; for production you should register
// for an API key if required and set it as 9292_API_KEY in env. This route demonstrates
// how the backend will proxy requests when a key is present.

router.get('/departures', async (req, res) => {
  const stopId = req.query.stopId;
  if (!stopId) return res.status(400).json({ error: 'stopId parameter required' });

  const apiKey = process.env['API_9292_KEY'] || process.env['9292_API_KEY'];
  if (!apiKey) {
    return res.status(501).json({
      error: '9292 API access not configured',
      message: 'Set 9292_API_KEY in your environment to enable live 9292 queries, or use the /api/transport endpoints as a free alternative.'
    });
  }

  const key = `9292:departures:${stopId}`;
  const cached = getCache(key);
  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(cached);
  }

  try {
    // NOTE: Replace the URL below with the official 9292 endpoint you registered for.
    const url = `https://api.9292.nl/0.1/stops/${encodeURIComponent(stopId)}/departures`;
    const r = await axios.get(url, { headers: { Authorization: `Bearer ${apiKey}` } });
    setCache(key, r.data, 15 * 1000);
    res.setHeader('X-Cache', 'MISS');
    return res.json(r.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    return res.status(500).json({ error: 'failed to fetch departures from 9292' });
  }
});

export default router;
