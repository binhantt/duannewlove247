export const appConfig = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  environment: process.env.NODE_ENV || 'development'
};