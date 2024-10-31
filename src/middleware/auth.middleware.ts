import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config'; // Import from the config module

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from 'Bearer <token>'
  
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }
    
    jwt.verify(token, jwtSecret!, (err, user) => {
      if (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
      }
  
      (req as any).user = user;
      next();
    });
}
