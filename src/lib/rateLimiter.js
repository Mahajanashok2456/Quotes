// Simple in-memory rate limiter for Next.js API routes
const rateLimitStore = new Map();

const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
};

export function rateLimit(req) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;

  // Get or create rate limit data for this IP
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const requests = rateLimitStore.get(ip);

  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  rateLimitStore.set(ip, validRequests);

  // Check if limit exceeded
  if (validRequests.length >= RATE_LIMIT.max) {
    return { success: false, error: 'Too many requests' };
  }

  // Add current request
  validRequests.push(now);
  rateLimitStore.set(ip, validRequests);

  return { success: true };
}