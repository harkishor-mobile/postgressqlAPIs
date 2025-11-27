"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//src/routes/addressRoutes.ts
const createAddress_1 = require("@controllers/addresses/createAddress");
const deleteAddressController_1 = require("@controllers/addresses/deleteAddressController");
const getUserAddressesList_1 = require("@controllers/addresses/getUserAddressesList");
const getUserWithAddresses_1 = require("@controllers/addresses/getUserWithAddresses");
const updateAddressController_1 = require("@controllers/addresses/updateAddressController");
const express_1 = require("express");
const authMiddleware_1 = require("@middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Create an address → logged-in user only
router.post('/add', authMiddleware_1.authMiddleware, createAddress_1.createAddressController);
// Get user with addresses (only for same logged-in user)
router.get('/user/:userId', authMiddleware_1.authMiddleware, getUserWithAddresses_1.getUserWithAddressesController);
// Get all addresses for the user
router.get('/list', authMiddleware_1.authMiddleware, getUserAddressesList_1.getUserAddressesController);
// Update an address → check owner
router.put('/addresses/:addressId', authMiddleware_1.authMiddleware, updateAddressController_1.updateAddressController);
// Delete an address → check owner
router.delete('/addresses/:addressId', authMiddleware_1.authMiddleware, deleteAddressController_1.deleteAddressController);
exports.default = router;
