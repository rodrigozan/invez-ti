// src/config/config.ts
export const config = {
  mongoUri: process.env.MONGO_URI,
  sqlServer: {
    host: process.env.SQL_HOST,
    port: Number(process.env.SQL_PORT),
    username: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DATABASE,
  },
  apiKey: process.env.API_KEY,
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
};
