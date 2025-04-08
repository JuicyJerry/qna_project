import { Router, Response, NextFunction, RequestHandler } from "express";
import { verifyToken, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

const verifyUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("verifyUser ---> ", req.user);
    res.json({
        success: true,
        message: "인증된 사용자 정보입니다.",
        user: req.user,
    });
};

// router.get("/me", verifyToken, verifyUser);
router.get("/me", verifyToken as RequestHandler, verifyUser as RequestHandler);

export default router;
