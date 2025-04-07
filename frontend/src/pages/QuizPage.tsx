import React from "react";
import { useEffect, useState } from "react";
import { getQuizzes } from "../api/quiz";
import QuizStepper from "../components/QuizStepper";
import { useLocation } from "react-router-dom";

const QuizPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const { categoryName } = location.state || {};

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await getQuizzes(categoryName);
                setQuizzes(data);
            } catch (err) {
                setError("퀴즈를 불러오지 못 했습니다.");
            } finally {
                setLoading(false);
            }
            // console.error("Error fetching quizzes:", error);
        };

        fetchQuizzes();
    }, []);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return !loading && !error && quizzes.length > 0 && <QuizStepper quizzes={quizzes} category={categoryName} />;

    // return (
    //     <div className="h-[calc(100vh-88px)] mt-[88px] p-[12px]">
    //         <h1>퀴즈</h1>
    //         <ul>
    //             {quizzes.map((quiz: Quiz, idx: number) => (
    //                 <li key={`quiz-${quiz.id}`}>
    //                     <h3>{quiz.question}</h3>
    //                     <ul>
    //                         {quiz.options.map((option: string, idx: number) => (
    //                             <li key={idx}>{option}</li>
    //                         ))}
    //                     </ul>
    //                 </li>
    //             ))}
    //         </ul>
    //         <button onClick={handleSubmit}>제출</button>
    //     </div>
    // );
};

export default QuizPage;
