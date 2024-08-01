// // config/multer.ts
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from './cloudinary';

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'requests', // Optional: specify a folder for better organization
//         allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
//     },
// });

// const upload = multer({ storage: storage });

// export default upload;
// config/multer.ts
// import multer from 'multer';
// import { Request } from 'express';

// const storage = multer.memoryStorage();

// const upload = multer({ storage });

// export default upload;
// // config/multer.ts
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

export default upload;
