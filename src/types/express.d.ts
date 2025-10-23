import { IUserPayload } from "../services/user.service";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUserPayload;
  }
}

export interface IUserPayload {
  id: string;
  role: "admin" | "user";
}
