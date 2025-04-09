export interface Quiz {
    id?: string;
    question: string;
    options: string[];
    answer: number;
}

// export interface QNAs {
//     [category: string]: Quiz[];
// }

export interface QNAs {
    commonSense: Quiz[];
    nonsense: Quiz[];
    history: Quiz[];
    science: Quiz[];
    koreanCulture: Quiz[];
    movieDrama: Quiz[];
}

export interface User {
    id: string;
    email: string;
    password: string;
    nickname: string;
    provider: "local" | "google" | "kakao";
}

export interface KakaoUser {
    id: string;
    email: string;
    name: string;
    provider: "local" | "google" | "kakao";
}
