import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            // 클라이언트(브라우저)가 /api로 시작하는 요청을 보낼 때만 프록시 대상
            "/api": {
                // 	실제로 API 요청을 보낼 대상 서버의 주소 (백엔드 서버 주소) localhost:5000은 Express 서버가 돌아가는 주소로 가정
                target: "http://localhost:5000",
                // HTTPS 인증서 검증을 하지 않겠다는 의미 (개발환경에서 self-signed 인증서 허용용)
                secure: false,
                // 백엔드 서버에 요청을 보낼 때 Origin 헤더를 target 서버로 맞춰서 보내줌 → CORS 이슈 방지에 사용
                changeOrigin: true,
                // 	클라이언트가 /api/users로 요청하면 → 실제 요청을 /users로 바꿔서 백엔드로 전달
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
