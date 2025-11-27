// src/types/express/index.d.ts
import { AuthPayload } from '@middlewares/authMiddleware';

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export {}; //  this is mandatory so TS treats it as a module
