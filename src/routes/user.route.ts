import express from "express";
import { getUsers, getUser, createUsers, updateUsers, deleteUsers } from "../controllers/users.controller";


const userRouter = express.Router();

//http://localhost:3000/api/users/
userRouter.get("/",  getUsers);

//http://localhost:3000/api/users/create
userRouter.post("/create",  createUsers);

//http://localhost:3000/api/users/
userRouter.get("/:id", getUser);

//http://localhost:3000/api/users/
userRouter.patch("/:id", updateUsers);

//http://localhost:3000/api/users/
userRouter.delete("/:id", deleteUsers);

export default userRouter;