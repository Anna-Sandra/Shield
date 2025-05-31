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

export async function createUsers(req: Request, res: Response) {
try{

  const { name, email, password } = req.body;

  res.status(200).json({ message: "User created successfully.",});
} catch (error) {
  res.status(500).json({ message: "Error fetching users" });
}
}


export async function updateUsers(req: Request, res: Response) {
  try {
    const userId = req.params.id; 
    const { name, email } = req.body;

    res.status(200).json({message: "User updated successfully.",});
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
}

export async function deleteUsers(req: Request, res: Response) {
try{
  const userId = req.params.id;

  res.status(200).json({message: "User deleted successfully.",});
} catch (error) {
  res.status(500).json({ message: "Error fetching users" });
}
}
