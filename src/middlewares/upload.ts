// src/middlewares/upload.ts
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '@config/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'user_profiles', // you can change folder based on route
    allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'], // include webp if needed
    public_id: `${Date.now()}-${file.originalname.split('.')[0]}`, // optional unique naming
  }),
});

export const upload = multer({ storage });
