// src/types/express.d.ts

import { AuthPayload } from '@middlewares/authMiddleware';

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

// This makes the file a module, which ensures TS loads it
export {};
