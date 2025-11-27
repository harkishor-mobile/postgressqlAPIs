// src/routes/authRoutes.ts
import { loginController } from '@controllers/auth/loginUser';
import { registerController } from '@controllers/auth/registerUser';
import { Router } from 'express';
import { upload } from 'middlewares/upload';

const router = Router();

router.post('/register', upload.single('image'), registerController);

router.post('/login', loginController);

export default router;
