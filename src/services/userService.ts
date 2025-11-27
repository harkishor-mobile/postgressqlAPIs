//src/services/userService.ts

import prisma from '@config/db';
import { GetUsersPaginatedParams } from '@utils/globalTypes';
import { hidePassword } from '@utils/hidePassword';
/**
 * Get paginated users with optional search, sorting, and exclusion of a user
 */
export const getUsersPaginated = async ({
  page = 1,
  limit = 10,
  search,
  sortBy,
  excludeUserId,
}: GetUsersPaginatedParams) => {
  const skip = (page - 1) * limit;

  // Build search filter
  const where: any = {
    ...(search && {
      OR: [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    }),
    ...(excludeUserId && { id: { not: excludeUserId } }),
  };

  // Sorting
  let orderBy: any = undefined;
  if (sortBy) {
    const [field, direction] = sortBy.split(':');
    const allowed = ['id', 'firstName', 'lastName', 'age', 'createdAt'];
    if (allowed.includes(field)) {
      orderBy = { [field]: direction === 'desc' ? 'desc' : 'asc' };
    }
  }

  // Total users matching filter
  const total = await prisma.user.count({ where });

  // Fetch users with pagination
  const users = await prisma.user.findMany({
    skip,
    take: limit,
    where,
    orderBy,
  });

  return {
    data: users.map(hidePassword),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
/**
 * Fetch all users from the database
 */
export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users.map(hidePassword);
};

/**
 * Get a single user by ID
 * @param userId - Numeric user ID
 */

export const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return hidePassword(user);
};

/**
 * Update user details by ID
 * @param userId - Numeric user ID
 * @param data - Fields to update (firstName, lastName, email, age)
 */
export const updateUser = async (
  userId: number,
  data: {
    firstName?: string;
    lastName?: string;
    age?: number;
    email?: string;
  },
  file?: Express.Multer.File
) => {
  const updateData: any = {
    ...data,
  };

  // If new image uploaded → update image path
  if (file) {
    updateData.image = file.path; // Cloudinary URL
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
};

/**
 * Delete a user by ID
 * @param userId - Numeric user ID
 * DELETE USER WITH CASCADE (works only if FK has ON DELETE CASCADE)
 */
export const deleteUser = async (userId: number) => {
  return prisma.user.delete({
    where: { id: userId },
  });
};

/**
 * Get full user profile including all related addresses
 * @param userId - Numeric user ID
 * Includes: addresses[]
 */
export const getUserProfile = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { addresses: true },
  });

  return hidePassword(user);
};

/**
 * Get user by email (used for checking if email already exists)
 * @param email - User email string
 */
export const getUserEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};
