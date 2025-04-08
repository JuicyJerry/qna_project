export interface Quiz {
    id: string;
    question: string;
    options: string[];
}

export interface QuizResponse {
    quizzes: Quiz[];
}

interface KakaoUserResponse {
    id: number;
    properties: {
        nickname: string;
        profile_image: string;
        thumbnail_image: string;
    };
    kakao_account: {
        email: string;
    };
}

interface KakaoLoginResponse {
    user: {
        id: string;
        email: string;
        nickname: string;
    };
}

interface KakaoError {
    error: string;
    error_description: string;
}
