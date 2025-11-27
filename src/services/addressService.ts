// src/services/addressService.ts
import prisma from '@config/db';

/**
 * Create a new address for a user
 */
export const createAddress = async (data: {
  userId: number;
  street: string;
  city: string;
  state: string;
  zipCode?: string;
}) => {
  return prisma.address.create({ data });
};

/**
 * Get user + their address list (User + addresses)
 * This returns user object PLUS all addresses
 */
export const getUserAddressList = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { addresses: true }, // fetch all related addresses
  });
};

/**
 * Get a single address by addressId
 */
export const getAddressById = async (addressId: number) => {
  return prisma.address.findUnique({
    where: { id: addressId },
  });
};

/**
 * Get ONLY addresses of a user (without user details)
 */
export const getUserAddressesOnly = async (userId: number) => {
  return prisma.address.findMany({
    where: { userId },
  });
};

/**
 * Update an address by ID
 */
export const updateAddress = async (
  addressId: number,
  data: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  }
) => {
  return prisma.address.update({
    where: { id: addressId },
    data,
  });
};

/**
 * Delete an address by ID
 */
export const deleteAddress = async (addressId: number) => {
  return prisma.address.delete({
    where: { id: addressId },
  });
};

/**
 * Get address list of login user
 * @param {number } userId
 */
export const getLoggedInUserAddresses = async (userId: number) => {
  return prisma.address.findMany({
    where: { userId }, //  Correct column
  });
};
