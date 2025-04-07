export interface Quiz {
    id: string;
    question: string;
    options: string[];
}

export interface QuizResponse {
    quizzes: Quiz[];
}
