import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../model/users";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
  const {name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });

    if (existing) {
      res.status(400).json({ error: 'Email already exists' })
      return;

    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({name, email, password: hashed });

    res.status(201).json({ message: 'User registered', userId: user._id });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
     res.status(401).json({ error: 'Invalid credentials' });
     return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       res.status(401).json({ error: 'Invalid credentials' });
       return;
    }

    const payload = {
      userId: user._id,
      email: user.email
   };
   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    res.json({ token });
    return;

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    return;
  }
};
