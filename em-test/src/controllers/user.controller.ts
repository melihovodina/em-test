import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { CreateUserInput } from "../schemas/user.schema";
import ApiError from "../exceptions/api-error";

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateUserInput = req.body;

      const user = await UserService.create(data);

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();

      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    
    if (!id) {
      return next(ApiError.badRequest("User ID is required"));
    }

    try {      
      const user = await UserService.getById(id);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    
    if (!id) {
      return next(ApiError.badRequest("User ID is required"));
    }

    try {
      const data: Partial<CreateUserInput> = req.body;

      const user = await UserService.update(id, data);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    
    if (!id) {
      return next(ApiError.badRequest("User ID is required"));
    }

    try {
      await UserService.delete(id);
      
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  static async block(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    
    if (!id) {
      return next(ApiError.badRequest("User ID is required"));
    }

    try {
      const user = await UserService.block(id);

      res.json({ message: "User blocked successfully", user });
    } catch (err) {
      next(err);
    }
  }
}
