import "dotenv/config";
import http from "http";
import app from "./app";
import mongoose from "mongoose";
import { connectMongoDB } from "./config/database";

const PORT = 3000;

const server = http.createServer(app);


mongoose.connection.once("open", () => {
  console.info("MongoDB connection ready");
});

mongoose.connection.on("error", (err: any) => {
  console.error("MongoDB connection error", err);
});

async function startServer() {
  connectMongoDB();


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

}


startServer();
 