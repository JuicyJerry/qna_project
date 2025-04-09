import axiosInstance from "./axios";

export const login = async (email: string, password: string) => {
    const res = await axiosInstance.post("/user/login", { email, password });
    console.log("login ===> ", res);
    return res.data;
};

export const getUserMe = async () => {
    const res = await axiosInstance.get("/protected/me"); // 쿠키 기반 인증
    console.log("getUserMe ---> ", res);
    return res.data;
};

export const registerUser = async (userData: { nickname: string; email: string; password: string }) => {
    console.log("registerUser[userData] ---> ", userData);
    const res = await axiosInstance.post("/user/register", userData);
    console.log("registerUser[res] ---> ", res);
    return res.data;
};
