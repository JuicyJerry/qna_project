import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db/index";
import { createApp } from "./app";
import * as redis from "redis";
import { RedisClientType } from "redis";

const { API_PORT, REDIS_URL } = process.env;

if (!API_PORT) throw new Error("PORT is required");
if (!REDIS_URL) throw new Error("REDIS_URL is required");

const startServer = async () => {
    const client = redis.createClient({ url: REDIS_URL });
    await client.connect();
    await connectDB();

    const app = createApp(client as RedisClientType);
    const server = app.listen(API_PORT, () => {
        console.log(`Server is running on port ${API_PORT}`);
    });

    return server;
};

startServer();
// const server = startServer();
