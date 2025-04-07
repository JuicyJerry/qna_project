import axiosInstance from "../api/axios";
// import axios from "axios";

export const getQuizzes = async (category: string) => {
    console.log("getQuizzes[category] ---> ", category);
    try {
        const res = await axiosInstance.get(`/quiz/${category}`);
        console.log("getQuizzes ---> ", res);
        return res.data;
    } catch (error) {
        console.log("Error fetching quizzes:", error);
        throw error;
    }
};

export const submitAnswer = async (answers: number[], category: string) => {
    try {
        console.log("submitAnswer ===> ", category);
        console.log("submitAnswer ===> ", answers);
        const res = await axiosInstance.post("/quiz/submit", { answers, category });
        console.log("submitAnswer ===> ", res.data);
        return res.data;
    } catch (error) {
        console.log("Error submitting answers:", error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const res = await axiosInstance.get("/quiz");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log("Error fetch Categories :", error);
        throw error;
    }
};
