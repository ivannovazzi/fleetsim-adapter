import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3000,
  token: process.env.TOKEN,
  apiUrl: process.env.API_URL,  
} as const;

export function verifyConfig() {
  if (!config.token) {
    throw new Error('Missing required environment variable: TOKEN');
  }
  if (!config.apiUrl) {
    throw new Error('Missing required environment variable: API_URL');
  }
}