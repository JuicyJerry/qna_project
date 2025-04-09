import * as redis from "redis";
import request from "supertest";
import { createApp } from "../app";

import { RedisClientType } from "redis";
import { Application } from "express";

let app: Application;
let redisClient: RedisClientType;

const REDIS_URL = "redis://default:test_env@localhost:6380";

beforeAll(async () => {
    redisClient = redis.createClient({ url: REDIS_URL });
    await redisClient.connect();
    app = createApp(redisClient);
});

beforeEach(async () => {
    await redisClient.flushDb();
    await redisClient.del("messages");
});

afterAll(async () => {
    await redisClient.flushDb();
    await redisClient.quit();
});

describe("POST /messages", () => {
    it("responds with a success message", async () => {
        const response = await request(app).post("/messages").send({ message: "testing with redis" });

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Message added to list");
    });
});

describe("GET /messages", () => {
    it("responds with all messages", async () => {
        await redisClient.lPush("messages", ["msg1", "msg2"]);
        const response = await request(app).get("/messages");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(["msg2", "msg1"]);
    });
});
