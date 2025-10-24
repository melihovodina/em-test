import User from "../models/user.model";
import bcrypt from "bcryptjs";
import ApiError from "../exceptions/api-error";
import { CreateUserInput } from "../schemas/user.schema";

export class UserService {
  static async create(data: CreateUserInput) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) throw ApiError.badRequest("User with this email already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return User.create({ ...data, password: hashedPassword });
  }

  static async getAll() {
    return User.find().select("-password");
  }

  static async getById(id: string) {
    const found = await User.findById(id).select("-password");

    if (!found){
      throw ApiError.badRequest("User not found");
    }
    
    return found;
  }

   static async findByEmail(email: string) {
    const found = await User.findOne({ email });

    if (!found) {
      throw ApiError.badRequest("User not found");
    }
    
    return found;
  }

  static async update(id: string, data: Partial<CreateUserInput>) {
    const existingUser = await User.findById(id);
    if (!existingUser) throw ApiError.badRequest("User not found");

    if (data.email) {
      const userWithEmail = await User.findOne({ email: data.email });

      if (userWithEmail && userWithEmail.id !== id) {
        throw ApiError.badRequest("Email is already in use");
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
    return updated!;
  }


  static async delete(id: string) {
    const existingUser = await User.findById(id);
    if (!existingUser) throw ApiError.badRequest("User not found");

    await User.findByIdAndDelete(id);
  }

  static async block(id: string) {
    const existingUser = await User.findById(id);
    if (!existingUser) throw ApiError.badRequest("User not found");

    const blocked = await User.findByIdAndUpdate(id, { isActive: false }, { new: true }).select("-password");
    return blocked!;
  }
}
