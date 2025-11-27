// src/services/authService.ts
import prisma from '@config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserEmail } from './userService';
import { hidePassword } from '@utils/hidePassword';
import { Role } from '../generated/client';

// Secret key used for signing JWT tokens
const JWT_SECRET = process.env.JWT_SECRET || 'MyJwtSecretKey@123@';

/**
 * Register a new user
 * 1. Check if the email already exists
 * 2. Hash the user's password
 * 3. Save the user in the database
 */
export const registerUser = async (data: any, file?: Express.Multer.File) => {
  const { email, password, firstName, lastName, age, role } = data;

  //  Step 1: Check if email is already registered
  const existingUser = await getUserEmail(email);

  if (existingUser) {
    throw new Error('Email already exists');
  }

  //  Step 2: Encrypt the password before storing it

  const hashedPassword = await bcrypt.hash(password, 10);

  // Step 3: Create and return the new user
  const userData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    age: age ? Number(age) : null,
    image: file ? file.path : '', // Prisma requires String, so fallback empty string
    role: role === 'ADMIN' ? Role.ADMIN : Role.USER, // set user role
  };

  // Step 4: Create User
  const user = await prisma.user.create({
    data: userData,
  });
  return hidePassword(user); // remove password from register response
};

/**
 * Login a user
 * 1. Check if the email exists
 * 2. Compare password with hashed password
 * 3. Generate a JWT token
 */
export const loginUser = async (email: string, password: string) => {
  //  Step 1: Check if user exists with this email
  const user = await getUserEmail(email);
  if (!user) throw new Error('Invalid email or password');

  //  Step 2: Compare entered password with hashed password stored in DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  //  Step 3: Generate JWT token for authentication
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' } // token validity
  );

  return {
    user: hidePassword(user), // remove password from login response
    token,
  };
};
