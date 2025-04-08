import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserMe } from "../api/auth";

const OAuthKakaoHandler = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 백엔드 콜백 URL로 직접 fetch
        const checkLogin = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 500)); // 쿠키 반영 시간 확보

                const user = await getUserMe(); // 쿠키에 저장된 JWT 기반 로그인 확인
                console.log("Kakao login success:", user);
                navigate("/"); // 홈으로 이동
            } catch (err) {
                console.error("Kakao login failed:", err);
                navigate("/login"); // 로그인 실패 시 로그인 페이지로
            } finally {
                setLoading(false);
            }
        };

        checkLogin();
    }, [navigate]);

    return <p>{loading ? "로그인 처리 중입니다..." : "리디렉션 중..."}</p>;
};

export default OAuthKakaoHandler;
