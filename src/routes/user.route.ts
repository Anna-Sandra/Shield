import express from "express";
import { getUsers, createUsers, updateUsers, deleteUsers } from "../controllers/users.controller";


const userRouter = express.Router();

userRouter.get("/", getUsers);
// userRouter.post("/create");

userRouter.post("/users", createUsers);

userRouter.put("/users/:id", updateUsers);

userRouter.delete("/users/:id", deleteUsers);

export default userRouter;