//src/routes/addressRoutes.ts
import { createAddressController } from '@controllers/addresses/createAddress';
import { deleteAddressController } from '@controllers/addresses/deleteAddressController';
import { getUserAddressesController } from '@controllers/addresses/getUserAddressesList';
import { getUserWithAddressesController } from '@controllers/addresses/getUserWithAddresses';
import { updateAddressController } from '@controllers/addresses/updateAddressController';
import { Router } from 'express';
import { authMiddleware } from 'middlewares/authMiddleware';

const router = Router();

// Create an address → logged-in user only
router.post('/add', authMiddleware, createAddressController);

// Get user with addresses (only for same logged-in user)
router.get('/user/:userId', authMiddleware, getUserWithAddressesController);

// Get all addresses for the user
router.get('/list', authMiddleware, getUserAddressesController);

// Update an address → check owner
router.put('/addresses/:addressId', authMiddleware, updateAddressController);

// Delete an address → check owner
router.delete('/addresses/:addressId', authMiddleware, deleteAddressController);

export default router;
