import path from "path";
import cors from "cors";
import express from "express";
import { fileURLToPath } from "url";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import playerRouter from "./src/services/players/index.js";
import sessionRouter from "./src/services/sessions/index.js";
import historyRouter from "./src/services/history/index.js";

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, "./client/build")));

// R O U T E R S     H E R E

server.use("/api/players", playerRouter);
server.use("/api/sessions", sessionRouter);
server.use("/api/history", historyRouter);

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

// M I D D L E W A R E S   H E R E

const { PORT } = process.env || 3005;

// D A T A B A S E     H E R E

mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => {
    console.table(listEndpoints(server));
    console.log(`Server is listening on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB", err);
});
