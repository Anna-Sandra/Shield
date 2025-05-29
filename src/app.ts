import express from "express";
import userRouter from "./routes/user.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("shield is live");
});

app.use("/users", userRouter);

export default app;
