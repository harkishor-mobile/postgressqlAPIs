// src/app.ts
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import authRoutes from '@routes/authRoutes';
import userRoutes from '@routes/userRoutes';
import addressRoutes from '@routes/addressRoutes';
import productRoutes from '@routes/productRoutes';
import cartRoutes from '@routes/cartRoutes';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Define Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/address', addressRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);

// Root route
app.get('/', (_req, res) => {
  res.send(
    `<h1 style="color: blue; text-align: center; font-size: 64px; margin-top:100px;"> ✅ node-postgres-ts 🐘  Running 🏃 </h1>`
  );
});

export default app;
