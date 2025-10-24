import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../exceptions/api-error";
import { CreateUserInput } from "../schemas/user.schema";
import { UserService } from "./user.service";
import { IUserPayload } from "../types/express";

interface TokenPayload {
  id: string;
  role: "admin" | "user";
}

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = "1h";

export class AuthService {
  static async register(data: CreateUserInput) {
    const user = await UserService.create(data);

    const token = AuthService.generateToken({ id: user.id, role: user.role });
    return { user, token };
  }

  static async login(email: string, password: string) {
    const user = await UserService.findByEmail(email);
    if(!user) throw ApiError.badRequest("Invalid email or password");
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw ApiError.badRequest("Invalid email or password");

    const token = AuthService.generateToken({ id: user.id, role: user.role });
    return { user, token };
  }

  private static generateToken(payload: TokenPayload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  static validateToken(token: string): IUserPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as IUserPayload;
    } catch (err) {
      return null;
    }
  }
}
