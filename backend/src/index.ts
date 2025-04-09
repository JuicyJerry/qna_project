import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/index";

import { createApp } from "./app";

const { API_PORT } = process.env;

const startServer = async () => {
    const app = createApp();
    const server = app.listen(API_PORT, () => {
        console.log(`Server is running on port ${API_PORT}`);
    });
    await connectDB();

    return server;
};

startServer();
// const server = startServer();
