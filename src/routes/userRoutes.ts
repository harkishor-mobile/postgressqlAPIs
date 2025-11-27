// src/routes/userRoute.ts

import { Router } from 'express';
import { deleteUserController } from '@controllers/users/deleteUser';
import { getUserByIdController } from '@controllers/users/getUserById';
import { getUserListController } from '@controllers/users/getUserList';
import { updateUserController } from '@controllers/users/updateUser';
import { getUserProfileController } from '@controllers/users/getUserProfile';
import { authMiddleware, isAdmin } from '@middlewares/authMiddleware';
import { authorizeUser } from '@middlewares/authorizeUser';
import { upload } from '@middlewares/upload';

const router = Router();

// Protected routes
router.get('/list', authMiddleware, getUserListController);
router.get('/:id', authMiddleware, getUserByIdController);
router.put(
  '/:id',
  authMiddleware,
  authorizeUser,
  upload.single('image'),
  updateUserController
);
router.get('/profile/:id', authMiddleware, getUserProfileController);

// Only ADMIN can delete any user
router.delete('/:id', authMiddleware, isAdmin, deleteUserController);

export default router;
