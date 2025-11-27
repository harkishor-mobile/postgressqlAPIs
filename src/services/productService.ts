// src/services/productService.ts
import prisma from '@config/db';
import { ensureIsAdmin } from '@utils/ensureIsAdmin';
import { CreateProductInput, UpdateProductInput } from '@utils/globalTypes';

/**
 * Create new product
 * - Only admins can create
 */

export const createProductService = async (
  actingUserId: number,
  data: CreateProductInput & { images: string[] }
) => {
  await ensureIsAdmin(actingUserId);

  return prisma.product.create({ data });
};

/**
 * Fetch paginated list of products
 * - Optional search (name, description)
 * - Available to all users
 */
export const getProductList = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const page = params?.page && params.page > 0 ? params.page : 1;
  const limit = params?.limit && params.limit > 0 ? params.limit : 10;
  const skip = (page - 1) * limit;

  // Build flexible search query
  const where: any = params?.search
    ? {
        OR: [
          { name: { contains: params.search, mode: 'insensitive' } },
          { description: { contains: params.search, mode: 'insensitive' } },
        ],
      }
    : {};

  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return {
    data: items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Fetch product by ID
 * - Returns `null` if not found (controller handles)
 */
export const getProductById = async (productId: number) => {
  return prisma.product.findUnique({
    where: { id: productId },
  });
};

/**
 * Update product
 * - Only Admins can update
 * - Throws error if product doesn't exist
 */
export const updateProductService = async (
  actingUserId: number,
  productId: number,
  data: UpdateProductInput
) => {
  // Ensure admin
  await ensureIsAdmin(actingUserId);

  try {
    // Update product
    return await prisma.product.update({
      where: { id: productId },
      data,
    });
  } catch (err: any) {
    if (err.code === 'P2025') {
      throw new Error('Product not found');
    }
    throw err;
  }
};

/**
 * Delete product by ID
 * - Only admins can delete
 * - Throws error if product does not exist
 */
export const deleteProduct = async (
  actingUserId: number,
  productId: number
) => {
  await ensureIsAdmin(actingUserId);

  try {
    return await prisma.product.delete({
      where: { id: productId },
    });
  } catch (err: any) {
    if (err.code === 'P2025') {
      throw new Error('Product not found');
    }
    throw err;
  }
};
