import { Request, Response, NextFunction } from "express";
import ApiError from "../exceptions/api-error";
import {AuthService} from "../services/auth.service";

export class AuthMiddleware {
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return next(ApiError.unathorizedError());

      const token = authHeader.split(" ")[1];
      if (!token) return next(ApiError.unathorizedError());

      const userData = AuthService.validateToken(token);
      if (!userData) return next(ApiError.unathorizedError());

      req.user = userData;

      next();
    } catch (err) {
      return next(ApiError.unathorizedError());
    }
  }

  static isAdmin(req: Request, res: Response, next: NextFunction) {
    AuthMiddleware.verifyToken(req, res, () => {});

    if (req.user?.role !== "admin") return next(ApiError.unathorizedError());

    next();
  }

  static isSelf(req: Request, res: Response, next: NextFunction) {
    AuthMiddleware.verifyToken(req, res, () => {});

    const { id } = req.params;

    if (req.user.role !== "admin" && req.user.id !== id) {
      return next(ApiError.unathorizedError());
    }

    next();
  }

  static selfOrAdmin(req: Request, res: Response, next: NextFunction) {
   AuthMiddleware.verifyToken(req, res, () => {});

    const { id } = req.params;

    if (req.user.role !== "admin" && req.user.id !== id) {
      return next(ApiError.unathorizedError());
    }

    next();
  }
}
