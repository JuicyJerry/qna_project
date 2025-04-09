import { Router, Request, Response } from "express";
import users from "../data/user.mock.json"; // 임시 유저 데이터
import { User } from "../types/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/User";

const router = Router();
const tempUsers: User[] = []; // 임시 저장소 (MongoDB 연결 시 대체 예정)

const loginHandler = async (req: Request, res: Response): Promise<void> => {
    const JWT_SECRET: string = process.env.JWT_SECRET ?? "default_secret";
    const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? "1h";

    const { email, password } = req.body;
    console.log("[loginHandler] email, password ===> ", email, password);

    if (!email || !password) res.status(400).json({ message: "이메일과 비밀번호를 모두 입력해주세요." });
    // return

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            res.status(401).json({ message: "존재하지 않는 사용자입니다." });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
            //  return
        }

        const token = jwt.sign({ id: user._id, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "lax",
        });

        res.status(200).json({ success: true, user });
        // return
    } catch (err) {
        console.error("로그인 오류:", err);
        res.status(500).json({ message: "로그인 중 오류 발생" });
        // return
    }

    // const signOptions: SignOptions = {
    //     expiresIn: String,
    // };

    // const { email, password } = req.body;
    // const user = (users as User[]).find((u) => u.email === email && u.password === password);

    // if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    // if (!user) {
    //     res.status(401).json({ success: false, message: "이메일 또는 비밀번호가 일치하지 않습니다." });
    // } else {
    //     try {
    //         // JWT 토큰 발급
    //         const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

    //         // 쿠키로 저장
    //         res.cookie("token", token, {
    //             httpOnly: true,
    //             maxAge: 1000 * 60 * 60, // 1시간
    //             secure: false, // https 환경에서는 true
    //             sameSite: "lax",
    //         });

    //         // 성공 시 토큰 or 유저 정보 반환
    //         res.json({
    //             success: true,
    //             user: {
    //                 id: user.id,
    //                 email: user.email,
    //                 nickname: user.nickname,
    //             },
    //         });
    //     } catch (err) {
    //         res.send(err);
    //     }
    // }
};

const registerHandler = async (req: Request, res: Response) => {
    const JWT_SECRET: string = process.env.JWT_SECRET ?? "default_secret";
    const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? "1h";

    const { email, password, nickname } = req.body;
    console.log("email, password, nickname", email, password, nickname);

    if (!email || !password || !nickname) {
        res.status(400).json({ success: false, message: "모든 필드를 입력해주세요." });
        // return
    }

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: "이미 존재하는 이메일입니다." });
            // return
        }

        const hashedPw = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            email,
            nickname,
            password: hashedPw,
            provider: "local",
        });

        const token = jwt.sign({ id: newUser._id, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "lax",
        });

        res.status(201).json({ success: true, user: newUser });
        return;
    } catch (err) {
        console.error("회원가입 오류:", err);
        res.status(500).json({ message: "회원가입 중 오류가 발생했습니다." });
        return;
    }

    // const existing = tempUsers.find((u) => u.email === email);
    // if (existing) {
    //     res.status(409).json({ success: false, message: "이미 등록된 이메일입니다." });
    //     return;
    // }

    // const newUser: User = {
    //     id: `${Date.now()}`,
    //     nickname,
    //     email,
    //     password, // 실제 서비스에서는 반드시 bcrypt로 암호화!
    //     provider: "local",
    // };

    // tempUsers.push(newUser);
    // const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

    // res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     maxAge: 1000 * 60 * 60 * 24,
    //     sameSite: "lax",
    // });

    // res.status(201).json({ success: true, user: newUser });
};

router.post("/login", loginHandler);
router.post("/register", registerHandler);

export default router;
