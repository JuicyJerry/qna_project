import express, { Router } from "express";
import quizRouter from "./routes/quiz";
import cors from "cors";

const { VITE_API_BASE_URL } = process.env;

export const createApp = () => {
    console.log("VITE_API_BASE_URL ---> ", VITE_API_BASE_URL);
    const app = express();
    app.use(express.json());
    app.use(cors({ origin: VITE_API_BASE_URL, credentials: true }));
    app.use("/quiz", quizRouter);

    app.get("/", (req, res) => {
        res.send("QNA 서버가 실행 중입니다!");
    });

    return app;
};
