import express from "express";
import { register, login } from "../controllers/auth.controller";
import {authenticate} from "../middleware/auth.middleware"


const router = express.Router();


//http://localhost:3000//api/auth/
router.post("/register", register);

//http://localhost:3000//api/auth/
router.post("/login", login);

router.get("/authenticate", authenticate, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
  return;
});

export default router;