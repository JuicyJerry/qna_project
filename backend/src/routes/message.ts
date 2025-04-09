import { Router } from "express";
import { RedisClientType } from "redis";

export default function messageRouter(client: RedisClientType) {
    const router = Router();
    const { LIST_KEY } = process.env;

    if (!LIST_KEY) throw new Error("LIST_KEY is required");

    router.post("/", async (req, res) => {
        const { message } = req.body;
        await client.lPush(LIST_KEY, message);
        res.status(200).send("Message added to list");
    });

    router.get("/", async (req, res) => {
        const messages = await client.lRange(LIST_KEY, 0, -1);
        res.status(200).json(messages);
    });

    return router;
}

// 테스트와 실제 환경을 분리하기 위해, Redis 클라이언트를 외부에서 주입받는 구조 (아래에서 위로 교체)
// 기존 아래는 새로 Redis를 직접 새로 생성하고 있어서 6380으로 연결해도 6379로 날아가버림

// import * as redis from "redis";
// import { Router, Request, Response } from "express";

// const router = Router();

// const { LIST_KEY, REDIS_URL } = process.env;
// import { RedisClientType } from "redis";

// const createClientApp = async (client: RedisClientType) => {
//     const client = redis.createClient({ url: REDIS_URL });
//     await client.connect();
//     return client;
// };

// const postMessageHandler = async (req: Request, res: Response) => {
//     console.log("[postMessageHandler]  ===> ", LIST_KEY);
//     const client = await createClientApp();
//     const { message } = req.body;

//     if (LIST_KEY) {
//         await client.lPush(LIST_KEY, message);
//         res.status(200).send("Message added to list");
//     }
// };

// const getMessageHandler = async (req: Request, res: Response) => {
//     console.log("[getMessageHandler]  ===> ", LIST_KEY);
//     const client = await createClientApp();

//     if (LIST_KEY) {
//         const messages = await client.lRange(LIST_KEY, 0, -1);
//         res.status(200).send(messages);
//     }
// };

// router.post("/", postMessageHandler);
// router.get("/", getMessageHandler);

// export default router;
