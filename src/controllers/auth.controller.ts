import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/User";
import { createToken } from "../utils/jwt";
import { redisClient } from "../config/cache";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.email = email;
    user.password = password;

    await AppDataSource.manager.save(user);
    return res.status(201).json({
      code: 201,
      status: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(201).json({
      code: 500,
      status: false,
      message: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await AppDataSource.manager.findOne(User, { where: { email } });

  if (!user || (await !bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      code: 401,
      status: false,
      message: "Unauthorized",
    });
  }
  const token = createToken(user.id);
  await redisClient.set(user.id.toString(), token);

  res
    .cookie("token", token, { httpOnly: true })
    .json({ message: "Login successful" });
};
export const logout = async (req: Request, res: Response) => {
  const userId = req.query.id;
  await redisClient.del(userId?.toString());

  res.clearCookie("token").json({ message: "Logged Out" });
};
