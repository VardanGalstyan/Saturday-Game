import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import playerRouter from './services/players/index.js';
import sessionRouter from './services/sessions/index.js';
import historyRouter from './services/history/index.js';

const server = express()

server.use(cors())
server.use(express.json());

// R O U T E R S     H E R E 

server.use("/players", playerRouter)
server.use("/sessions", sessionRouter)
server.use("/history", historyRouter)

// M I D D L E W A R E S   H E R E

const { PORT } = process.env;

// D A T A B A S E     H E R E

mongoose.connect(process.env.MONGO_CONNECTION)
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
        console.table(listEndpoints(server));
        console.log(`Server is listening on port ${PORT}`);

    })
})

mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB", err);
})