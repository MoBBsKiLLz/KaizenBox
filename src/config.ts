// src/config.ts
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not set');
}

export { jwtSecret };
