import { configDotenv } from 'dotenv';
configDotenv();

const development = { ...process.env,
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    EMAIL_SERVICE:process.env.EMAIL_SERVICE,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
};
    

export default development;
