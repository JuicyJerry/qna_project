import express, { Request, Response } from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// 메모리 저장소 (임시)
const verificationCodes: { [email: string]: string } = {};

// 이메일 전송 설정
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 인증번호 발송
router.post("/send", async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: "이메일이 필요합니다." });
        return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 랜덤 숫자
    verificationCodes[email] = code;

    const mailOptions = {
        from: `"QNA 서비스" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "QNA 인증번호",
        text: `인증번호는 [${code}] 입니다. 5분 내 입력해주세요.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "이메일 발송 완료" });
    } catch (error) {
        console.error("이메일 전송 오류:", error);
        res.status(500).json({ success: false, message: "이메일 전송 실패" });
    }
});

// 인증번호 확인
router.post("/verify", (req: Request, res: Response): void => {
    const { email, code } = req.body;

    if (!email || !code) {
        res.status(400).json({ message: "이메일과 인증번호가 필요합니다." });
        return;
    }

    if (verificationCodes[email] !== code) {
        res.status(401).json({ success: false, message: "인증번호가 올바르지 않습니다." });
        return;
    }

    // 성공 시 해당 코드 제거
    delete verificationCodes[email];
    res.status(200).json({ success: true, message: "인증 성공" });
});

export default router;
