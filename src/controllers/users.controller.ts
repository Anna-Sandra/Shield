import { Response, Request } from "express";

import User from "../model/users";

export async function getUsers(req: Request, res: Response) {
  try {
    const userList = await User.find();
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
}


export async function createUsers(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
}


export async function updateUsers(req: Request, res: Response) {
 try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
}

export async function deleteUsers(req: Request, res: Response) {
try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
}
