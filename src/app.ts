import express from "express";
import userRouter from "./routes/user.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("shield is live");
});

app.post("/users", (req, res) => {
  res.send("User created");
});

app.put("/users/:id", (req, res) => {
  res.send(`User with ID ${req.params.id} updated`);
});

app.delete("/users/:id", (req, res) => {
  res.send(`User with ID ${req.params.id} deleted`);
});

app.use("/users", userRouter);


export default app;
