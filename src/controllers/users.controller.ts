import { Response, Request } from "express";

export async function getUsers(req: Request, res: Response) {
  try {
    // Simulate fetching users from a database
    const users = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ];

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
}

export async function createUser(req: Request, res: Response) {}

export async function updateUser(req: Request, res: Response) {}

export async function deleteUser(req: Request, res: Response) {}
