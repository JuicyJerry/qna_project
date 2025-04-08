// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { ENV } from "../config/env";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert("이메일과 비밀번호를 입력해주세요.");
            return;
        }

        try {
            const data = await login(email, password);
            console.log("로그인 성공:", data);

            // 예: 토큰 저장 + 리다이렉트
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/");
        } catch (err) {
            alert("로그인에 실패했습니다.");
            console.error(err);
        }
    };

    const handleGoogleLogin = () => {
        console.log("handleGoogleLogin ---> ", ENV.GOOGLE_LOGIN_URL);
        if (ENV.GOOGLE_LOGIN_URL) {
            window.location.href = ENV.GOOGLE_LOGIN_URL;
        } else {
            console.error("Google login URL is not defined.");
            alert("Google 로그인 URL이 설정되지 않았습니다.");
        }
    };

    const handleKakaoLogin = () => {
        window.location.href = ENV.KAKAO_LOGIN_URL;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4 py-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🔐 로그인</h2>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            이메일
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="example@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition">
                        로그인
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    아직 회원이 아니신가요?
                    <a href="/register" className="text-blue-500 ml-1 hover:underline">
                        회원가입
                    </a>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                    <button onClick={handleGoogleLogin} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md">
                        🔴 Google 로그인
                    </button>
                    <button onClick={handleKakaoLogin} className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 rounded-md">
                        🟡 Kakao 로그인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
