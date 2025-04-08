import axios from "axios";
// import { ENV } from "../config/env";

const axiosInstance = axios.create({
    baseURL: "/api",
    // 모든 요청에 기본적으로 포함될 헤더
    // 백엔드에서 JSON 형태로 데이터를 주고받기 때문에 사용
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    // 쿠키 기반 인증 시 필요한 설정, CORS 요청 시 쿠키를 포함하도록 함
    withCredentials: true,
});

export default axiosInstance;
