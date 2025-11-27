// src/services/cartService.ts
import prisma from '@config/db';

/**
 * Add product to cart
 * If item exists → increase quantity
 */
export const addToCart = async (
  userId: number,
  productId: number,
  quantity = 1
) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) throw new Error('Product not found');

  const existing = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (existing) {
    return await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  }

  return await prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity,
    },
  });
};

/**
 * Get cart items + cart total
 */
export const getCartItems = async (userId: number) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });

  const total = cartItems.reduce((sum, item) => {
    return sum + item.quantity * item.product.price;
  }, 0);

  return { items: cartItems, total };
};

/**
 * Update item quantity in cart
 */
export const updateCartItemQuantity = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const existing = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (!existing) throw new Error('Cart item not found');

  if (quantity <= 0) {
    await prisma.cartItem.delete({
      where: { id: existing.id },
    });
    return null;
  }

  return await prisma.cartItem.update({
    where: { id: existing.id },
    data: { quantity },
  });
};

/**
 * Remove single item from cart
 */
export const removeCartItem = async (userId: number, productId: number) => {
  const existing = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (!existing) throw new Error('Cart item not found');

  await prisma.cartItem.delete({
    where: { id: existing.id },
  });

  return true;
};

/**
 * Clear full cart
 */
export const clearCart = async (userId: number) => {
  await prisma.cartItem.deleteMany({ where: { userId } });
  return true;
};

/**
 * Admin: get all user carts
 */

export const adminGetAllCarts = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      image: true,
      cartItems: {
        include: {
          product: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { id: 'asc' },
  });

  // --- Format response ---
  const formatted = users.map((user) => {
    const userInfo = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImage: user.image,
    };

    const items = user.cartItems.map((item) => ({
      id: item.id,
      userId: item.userId,
      productId: item.productId,
      quantity: item.quantity,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,

      product: item.product,

      totalPrice: item.product.price * item.quantity,
    }));

    return {
      userInfo,
      items,
    };
  });

  const totalUsers = formatted.length;
  const totalCartItems = users.reduce((acc, u) => acc + u.cartItems.length, 0);

  return {
    carts: formatted,
    totalUsers,
    totalCartItems,
  };
};

export const getAllCarts = async () => {
  // Fetch all users with their cart items
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      image: true,
      cartItems: {
        select: {
          id: true,
          productId: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
            },
          },
        },
      },
    },
  });

  let totalCartItems = 0;
  let totalCartValue = 0;

  const formattedUsers = users.map((user) => {
    const items = user.cartItems.map((item) => {
      const totalPrice = item.product.price * item.quantity;

      totalCartItems++;
      totalCartValue += totalPrice;

      return {
        itemId: item.id,
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        images: item.product.images,
        totalPrice,
      };
    });

    const cartTotal = items.reduce((sum, i) => sum + i.totalPrice, 0);

    return {
      id: user.id,
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      email: user.email,
      profileImage: user.image || '',
      cartTotal,
      items,
    };
  });

  return {
    users: formattedUsers,
    summary: {
      totalUsers: users.length,
      totalCartItems,
      totalCartValue,
    },
  };
};
