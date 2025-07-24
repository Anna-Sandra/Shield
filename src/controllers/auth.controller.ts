import { Request, Response } from "express";
import User from "../model/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logger } from "../Utils/logger"; 

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    logger.info(`New user registered: ${newUser._id}`); 
    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    logger.error(`Registration failed: ${(error as Error).message}`); 
    res.status(500).json({ message: "Registration failed" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed - user not found: ${email}`); 
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      logger.warn(`Login failed - wrong password for: ${email}`); 
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }


    const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });

    logger.info(`User logged in: ${user._id}`); 
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    logger.error(`Login error: ${(error as Error).message}`); 
    res.status(500).json({ message: "Login failed" });
    return;
  }
}
