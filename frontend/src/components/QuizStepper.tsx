import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Quiz } from "../types/quiz";

const QuizStepper = ({ quizzes, category }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const navigate = useNavigate();

    const currentQuiz = quizzes[currentIndex];

    const handleSelect = (optionIndex: number) => {
        console.log("handleSelect[optionIndex] ---> ", optionIndex);
        console.log("handleSelect[...answers] ---> ", ...answers);
        const updatedAnswers = [...answers, optionIndex];
        setAnswers(updatedAnswers);
        console.log("handleSelect[answers] ---> ", updatedAnswers);

        if (currentIndex + 1 < quizzes.length) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            // 마지막 문제 → 결과 페이지로
            navigate("/result", { state: { answers: updatedAnswers, category: category } });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl w-full text-center animate-fadeDown">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">{currentQuiz.question}</h3>

                <ol className="flex flex-col gap-4">
                    {currentQuiz.options.map((opt: string, idx: number) => (
                        <li key={idx}>
                            <button
                                onClick={() => handleSelect(idx)}
                                className="w-full py-3 px-6 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold text-lg shadow-sm transition-all duration-200"
                            >
                                {`${idx + 1}. ${opt}`}
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );

    // return (
    //     <div className="flex flex-col gap-[30px]">
    //         <h3 className="text-[32px] font-bold">{currentQuiz.question}</h3>
    //         <ol className="flex gap-[20px]">
    //             {currentQuiz.options.map((opt: string, idx: number) => (
    //                 <li className={`relative before-number-${idx + 1} text-[24px] font-semibold`} key={idx}>
    //                     <button onClick={() => handleSelect(idx)}>{opt}</button>
    //                 </li>
    //             ))}
    //         </ol>
    //     </div>
    // );
};

export default QuizStepper;
