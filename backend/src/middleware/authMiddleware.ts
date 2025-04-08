import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/index";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export interface AuthRequest extends Request {
    user?: User;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    console.log("verifyToken ---> ", token);

    if (!token) {
        return res.status(401).json({ success: false, message: "인증되지 않은 사용자입니다. (토큰 없음)" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === "object" && decoded !== null) {
            req.user = decoded as User; // 사용자 정보 주입
            next();
        } else {
            return res.status(403).json({ success: false, message: "유효하지 않은 토큰입니다." });
        }
    } catch (error) {
        return res.status(403).json({ success: false, message: "유효하지 않은 토큰입니다." });
    }
};
