import { Response, Request } from "express";
import User from "../model/users";
import { logger } from "../Utils/logger"; 

export async function getUsers(req: Request, res: Response) {
  try {
    const userList = await User.find();
    logger.info('Fetched all users'); 
    res.status(200).json({ message: "List of all users.", users: userList });
  } catch (error) {
    logger.error(`Error fetching users: ${(error as Error).message}`); 
    res.status(500).json({ message: "Error fetching users" });
  }
}

export async function createUsers(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    logger.info(`Created user: ${newUser._id}`); 
    res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    logger.error(`Error creating user: ${(error as Error).message}`); 
    res.status(500).json({ message: "Error creating user" });
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    logger.info(`Fetched user with ID: ${id}`); 
    res.status(200).json({ message: "User found", user: user });
  } catch (error) {
    logger.error(`Error finding user: ${(error as Error).message}`); 
    res.status(500).json({ message: "Error finding user" });
  }
};

export async function updateUsers(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    logger.info(`Updated user with ID: ${id}`); 
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    logger.error(`Error updating user: ${(error as Error).message}`); 
    res.status(500).json({ message: "Error updating user" });
  }
}

export async function deleteUsers(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    logger.info(`Deleted user with ID: ${id}`); 
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    logger.error(`Error deleting user: ${(error as Error).message}`); 
    res.status(500).json({ message: "Error deleting user" });
  }
}
