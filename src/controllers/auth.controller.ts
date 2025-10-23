import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { CreateUserInput } from "../schemas/user.schema";

export class AuthController {
  static async register(req: Request, res: Response) {
    const userData: CreateUserInput = req.body;
    const { user, token } = await AuthService.register(userData);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600 * 1000
      })
      .status(201)
      .json({ user });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600 * 1000,
      })
      .json({ user });
  }
}
