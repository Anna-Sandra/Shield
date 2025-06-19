import { Response, Request } from "express";

import User from "../model/users";

export async function getUsers(req: Request, res: Response) {
  try {
    const userList = await User.find();
    res.status(200).json({ message: "List of all users.", users: userList});
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
    return;
  }
}


export async function createUsers(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({name, email, password});
  

    res.status(201).json({ message: "User created successfully.", user: newUser });
    return;
  } catch (error) {
    
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
    return;
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');

    res.status(200).json({ message: "User found", user: user });
     return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding user" });
     return;

  }
}


export async function updateUsers(req: Request, res: Response) {
 try {
    const { id } = req.params;
  const { name, email, password }= req.body;

    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password}, { new: true });

    res.status(200).json({ message: "User updated", user: updatedUser });
     return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
     return;

  }
}

export async function deleteUsers(req: Request, res: Response) {
try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);
    
    res.status(200).json({ message: "User deleted" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting user" });
    return;
  }
}