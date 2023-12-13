import { rateLimit } from 'express-rate-limit'
import ms from "ms"

export const limiter = rateLimit({
  skip: (req) => req.url === '/reset',
  windowMs: ms("15m"), // 15 minutes
  limit: 150, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
})