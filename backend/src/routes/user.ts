import { Router, Request, Response } from "express";
import users from "../data/user.mock.json"; // 임시 유저 데이터
import { User } from "../types/index";
import jwt from "jsonwebtoken";

const router = Router();

const getLogin = router.post("/login", (req: Request, res: Response): void => {
    const JWT_SECRET: string = process.env.JWT_SECRET ?? "default_secret";
    const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? "1h";

    // const signOptions: SignOptions = {
    //     expiresIn: String,
    // };

    const { email, password } = req.body;
    const user = (users as User[]).find((u) => u.email === email && u.password === password);

    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    if (!user) {
        res.status(401).json({ success: false, message: "이메일 또는 비밀번호가 일치하지 않습니다." });
    } else {
        try {
            // JWT 토큰 발급
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

            // 쿠키로 저장
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60, // 1시간
                secure: false, // https 환경에서는 true
                sameSite: "lax",
            });

            // 성공 시 토큰 or 유저 정보 반환
            res.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    nickname: user.nickname,
                },
            });
        } catch (err) {
            res.send(err);
        }
    }
});

router.get("/login", getLogin);

export default router;
