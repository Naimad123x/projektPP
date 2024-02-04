import { rateLimit } from 'express-rate-limit'
import ms from "ms"

export const limiter = rateLimit({
  skip: (req) => req.url === '/reset',
  windowMs: ms("15m"),
  limit: 150,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})