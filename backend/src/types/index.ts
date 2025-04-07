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
