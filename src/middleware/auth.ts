import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { config } from '../config';

export const auth = (...role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization;
      // console.log(token)
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'No Token Unauthorized',
        });
      }

      const bearerToken = token.split(' ')[1];

      if (!bearerToken) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized',
        });
      }
      const decodedToken = jwt.verify(
        bearerToken as string,
        config.secret as string
      ) as JwtPayload;
      req.user = decodedToken;
      if (role.length && !role.includes(decodedToken.role)) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized!!!!',
        });
      }
      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  };
};
