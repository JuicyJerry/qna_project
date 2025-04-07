import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitAnswer } from "../api/quiz";

const ResultPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { answers, category } = location.state || {};
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchQuizzesResult = async () => {
            try {
                console.log("result[answers] ---> ", answers, category);
                const data = await submitAnswer(answers, category);
                console.log("result[data] ---> ", data);
                setScore(data.score);
                setTotal(data.total);
            } catch (err) {
                setError("결과를 불러오지 못 했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzesResult();
    }, []);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fadeDown">🎯 Quiz Result</h1>

            <div className="text-xl font-medium text-gray-700 mb-2 animate-scaleIn">{score === total ? <p>🎉 모든 문제를 완료하셨습니다!</p> : <p>💪 잘 했어요! 다시 도전해 보세요!</p>}</div>

            <div className="text-4xl font-extrabold text-blue-600 my-4 animate-bounceOnce">
                {score || 0} / {total || 0}
            </div>

            <div className="flex gap-4 mt-6">
                <button onClick={() => navigate("/quiz")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl shadow-md transition transform hover:scale-105">
                    🔁 다른 문제 풀어보기
                </button>
                <button onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl shadow-md transition transform hover:scale-105">
                    🃏 낱말카드 재시작
                </button>
            </div>
        </div>
    );
};

export default ResultPage;
