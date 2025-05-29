import express from "express";
import { getUsers } from "../controllers/users.controller";

const userRouter = express.Router();

userRouter.get("/", getUsers);
// userRouter.post("/create");

export default userRouter;
