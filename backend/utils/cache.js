// Simple in-memory TTL cache for small-scale prototyping.
// Not suitable for multi-process production (use Redis or similar then).

const store = new Map();

export function setCache(key, value, ttlMs = 15000) {
  const expires = Date.now() + ttlMs;
  store.set(key, { value, expires });
}

export function getCache(key) {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    store.delete(key);
    return null;
  }
  return entry.value;
}

export function delCache(key) {
  store.delete(key);
}

export function clearCache() {
  store.clear();
}

export default { setCache, getCache, delCache, clearCache };
