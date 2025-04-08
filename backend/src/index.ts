import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";

const { API_PORT } = process.env;

const startServer = () => {
    const app = createApp();
    const server = app.listen(API_PORT, () => {
        console.log(`Server is running on port ${API_PORT}`);
    });

    return server;
};

startServer();
// const server = startServer();
