import { Request, Response, NextFunction } from 'express';

export const ipConsoleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const clientIP = req.ip || 
                   req.connection?.remoteAddress || 
                   req.socket?.remoteAddress || 
                   (req.connection as any)?.socket?.remoteAddress ||
                   req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   'unknown';

  const timestamp = new Date().toISOString();
  const userAgent = req.get('User-Agent') || 'unknown';
  const method = req.method;
  const url = req.originalUrl;

  console.log(`📍 [${timestamp}] IP Access: ${clientIP} | ${method} ${url} | User-Agent: ${userAgent}`);
  
  next();
};

export default ipConsoleMiddleware;