import passport from "passport";
import jwt, { SignOptions } from "jsonwebtoken";
import { Router } from "express";

import { User } from "../types/index";
const router = Router();

// 구글 로그인 진입
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

const JWT_SECRET: string = process.env.JWT_SECRET ?? "";
const JWT_EXPIRES_IN: string | number = process.env.JWT_EXPIRES_IN ?? "";
const GOOGLE_REDIRECT_URL: string = process.env.GOOGLE_REDIRECT_URL ?? process.env.LOGIN_FAIL_URL!;
const GOOGLE_REDIRECT_URL_FOR_CLIENT: string = process.env.GOOGLE_REDIRECT_URL_FOR_CLIENT ?? process.env.LOGIN_FAIL_URL!;
const KAKAO_REDIRECT_URL_FOR_CLIENT: string = process.env.KAKAO_REDIRECT_URL_FOR_CLIENT ?? process.env.LOGIN_FAIL_URL!;
const signOptions: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
};

// const user = (users as User[]).find((u) => u.email === email && u.password === password);

if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
console.log("/google/callback1 ===> ", GOOGLE_REDIRECT_URL);

// google 콜백 처리
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false, // 세션 대신 쿠키 or JWT 사용
    }),
    (req, res) => {
        // 로그인 성공 시 JWT 발급 + 쿠키 저장
        const user = req.user as User;

        // JWT 발급 + 쿠키 저장
        // 예: res.cookie("token", jwt.sign(...))

        console.log("[routes/auth]user ===> ", user);
        console.log("[routes/auth]user ===> ", user.id);
        console.log("[routes/auth]user ===> ", user.email);

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, signOptions);
        console.log("[routes/auth]token ===> ", token);
        console.log("[routes/auth]process.env.NODE_ENV ===> ", process.env.NODE_ENV === "production");

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            sameSite: "lax", // 또는 "none" (단, CORS와 함께라면 "none" + secure 필요)
        });

        console.log("/google/callback2");
        // res.redirect("http://localhost:3000/oauthgoogle");
        res.redirect(`${GOOGLE_REDIRECT_URL_FOR_CLIENT}`);
    }
);

// kakao
router.get("/kakao", passport.authenticate("kakao"));
router.get("/kakao/callback", passport.authenticate("kakao", { failureRedirect: "/login", session: false }), (req, res) => {
    const user = req.user as User;
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, signOptions);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "lax",
    });

    // res.redirect("http://localhost:3000/oauthkakao");
    res.redirect(`${KAKAO_REDIRECT_URL_FOR_CLIENT}`);
});

export default router;
