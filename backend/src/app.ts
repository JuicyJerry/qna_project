import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import session from "express-session";
import passport from "passport";

import quizRouter from "./routes/quiz";
import userRouter from "./routes/user";
import protectedRouter from "./routes/protected";
import authRouter from "./routes/auth";

import "./auth/google"; // 서버 진입 시 전략 미리 등록 ->  passport.authenticate("google") 라우터가 전략 찾을 수 있음
import "./auth/kakao";

const { API_BASE_URL, GOOGLE_CLIENT_SECRET } = process.env;

export const createApp = () => {
    console.log("API_BASE_URL ---> ", API_BASE_URL);
    const app = express();
    app.use(express.json());
    app.use(cors({ origin: API_BASE_URL, credentials: true }));
    app.use(cookieParser());
    app.use(
        session({
            secret: GOOGLE_CLIENT_SECRET || "default_secret", // .env로 분리해도 OK
            resave: false,
            saveUninitialized: true,
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/quiz", quizRouter);
    app.use("/user", userRouter);
    app.use("/protected", protectedRouter);
    app.use("/auth", authRouter);

    app.get("/", (req, res) => {
        res.send("QNA 서버가 실행 중입니다!");
    });

    return app;
};
