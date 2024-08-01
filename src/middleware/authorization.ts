




import jwt, { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import config from "../config/env/development";

dotenv.config();

export const checkAuthorizationToken = (authorization: string | undefined): string | null => {
    let bearerToken: string | null = null;
    if (authorization) {
        
        const token = authorization.split(' ')[1];
        bearerToken = token || authorization;
    }
    return bearerToken;
}

export const verifyToken = (token: string, JWT_SECRET: string): any => {
    return verify(token, JWT_SECRET);
}

export default function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers["authorization"];
    
    const token = checkAuthorizationToken(authHeader);

    if (!token) {
        throw{
          code:404,
          message:'invalid token',
          status:'fail',
          data:null
        }
    }

    try {
      (req as any).user = verifyToken(token, config.JWT_SECRET_KEY as string);
        next();
    } catch (err) {
        next (err)
    }
}
export const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Access denied. Only SuperAdmins can perform this action.' });
    }
    next();
};
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user.role !== 'admin') {
        
      return res.status(403).json({ message: 'Access denied. Only Admins can perform this action.' });
    }
    next();
};


