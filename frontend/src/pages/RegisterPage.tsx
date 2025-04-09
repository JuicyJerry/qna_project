// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import EmailTimer from "../components/EmailTimer";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [nickname, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [sentCode, setSentCode] = useState(""); // 임시 저장 (실제로는 백엔드 비교)
    const [error, setError] = useState("");
    const [step, setStep] = useState<"input" | "verify">("input");
    const [codeSent, setCodeSent] = useState(false);
    const [expired, setExpired] = useState(false);
    const [timerKey, setTimerKey] = useState(0); // 타이머 리셋용

    const sendVerificationCode = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email) || !email) {
            // alert("이메일 형식이 올바르지 않습니다.");
            return false;
        }
        return true;
    };

    const verifyEmail = () => {
        const requestVerify = sendVerificationCode();
        if (!requestVerify) {
            console.error("이메일 인증 요청 실패");
            alert("인증번호 전송에 실패했습니다.");
        } else {
            setCodeSent(true);
            setExpired(false);
            setTimerKey((prev) => prev + 1);

            alert("인증번호가 전송되었습니다.");
            // 실제 API 요청으로 대체
            const dummyCode = "123456";
            setSentCode(dummyCode);
            setStep("verify");
            alert(`인증번호가 ${email}로 전송되었습니다. (임시 코드: ${dummyCode})`);
        }
    };

    const handleVerifyCode = () => {
        if (verificationCode === sentCode) {
            setIsEmailVerified(true);
            alert("이메일 인증 완료!");
        } else {
            alert("인증번호가 일치하지 않습니다.");
        }
    };

    // const handleVerifyPassword = () => {
    //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).{6,}$/;

    //     if (!passwordRegex.test(password)) {
    //         alert("비밀번호는 6자 이상, 대소문자/숫자/특수문자를 포함해야 합니다.");
    //     } else if (!password) {
    //         alert("패스워드 입력하세요");
    //     }

    //     if (verificationCode === sentCode) {
    //         setIsEmailVerified(true);
    //         alert("이메일 인증 완료!");
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nickname || !email || !password) {
            alert("모든 값을 입력해주세요.");
            return;
        }

        if (!isEmailVerified) {
            setError("이메일 인증을 먼저 완료해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        setError("");
        console.log("회원가입 요청:", { nickname, email, password });

        // 회원가입 API 요청
        try {
            await registerUser({ nickname, email, password });
            alert("회원가입 성공!");
            navigate("/login");
        } catch (err) {
            console.error("회원가입 실패:", err);
            alert("회원가입에 실패했습니다.");
        }
    };

    const handleExpire = () => {
        setExpired(true);
        setStep("input");
        alert("⏰ 인증 시간이 만료되었습니다. 다시 인증을 요청해주세요.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-yellow-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">회원가입</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 이메일 */}
                    <div>
                        <label className="block text-sm font-medium">이메일</label>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border rounded-md"
                                disabled={isEmailVerified}
                                required
                            />
                            {!isEmailVerified && (
                                <>
                                    <button onClick={verifyEmail} className="w-20 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                                        {codeSent ? "재전송" : "인증"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* 인증번호 입력 */}
                    {!isEmailVerified && step === "verify" && (
                        <div>
                            <label className="block text-sm font-medium">인증번호</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                                    placeholder="6자리 숫자 입력"
                                />
                                <button type="button" onClick={handleVerifyCode} className="w-16 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                                    확인
                                </button>
                                {!expired && <EmailTimer key={timerKey} onExpire={handleExpire} />}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium">닉네임</label>
                        <div className="flex gap-2">
                            <input type="nickname" value={nickname} onChange={(e) => setNickName(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md" required />
                        </div>
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <label className="block text-sm font-medium">비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // onKeyDown={handleVerifyPassword}
                            className="mt-1 block w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">비밀번호 확인</label>

                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md" required />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md">
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
