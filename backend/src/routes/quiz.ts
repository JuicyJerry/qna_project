import { Router, RequestHandler } from "express";
import quizzes from "../data/quiz.mock.json";
import categories from "../data/category.mock.json";

const router = Router();

const getQuizList: RequestHandler = (req, res): void => {
    console.log(`[server]req.params ---> `, req.params);
    const { categories } = req.params as { categories: keyof typeof quizzes.example_questions };
    const quizList = quizzes.example_questions[categories];

    if (!quizList) {
        res.status(404).json({ error: "해당 카테고리가 존재하지 않습니다." });
    }

    console.log(`[server]quizList ---> `, quizList);

    res.json(quizList);
};

const sumbitQuiz: RequestHandler = (req, res): void => {
    const { answers, category } = req.body as { answers: any[]; category: keyof typeof quizzes.example_questions };
    const quizList = quizzes.example_questions[category];
    console.log("[server]sumbitQuiz ---> ", answers, category);
    if (!answers) {
        res.status(400).json({ error: "Answers are required" });
    } else {
        const correctCount = quizList.reduce((acc, quiz, idx) => {
            if (quiz.answer === answers[idx]) acc++;
            return acc;
        }, 0);

        res.json({
            success: true,
            score: correctCount,
            total: quizList.length,
        });
    }
};

const getQuizCategories: RequestHandler = (req, res): void => {
    console.log("[server]getQuizCategories ---> ", categories);
    res.json(categories);
};

router.get("/", getQuizCategories);
router.get("/:categories", getQuizList);
router.post("/submit", sumbitQuiz);

export default router;
