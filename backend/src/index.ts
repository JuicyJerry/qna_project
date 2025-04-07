import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";

const { VITE_API_PORT } = process.env;

const startServer = () => {
    const app = createApp();
    const server = app.listen(VITE_API_PORT, () => {
        console.log(`Server is running on port ${VITE_API_PORT}`);
    });

    return server;
};

startServer();
// const server = startServer();
