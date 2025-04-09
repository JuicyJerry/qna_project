import React from "react";
import { Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import CategoryListPage from "./pages/CategoryListPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import ResultPage from "./pages/ResultPage";
import LoginPage from "./pages/LoginPage";
import OAuthGoogleHandler from "./utils/OAuthGoogleHandler";
import OAuthKakaoHandler from "./utils/OAuthKakaoHandler";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <div className="h-screen flex justify-center items-center mt-[88px]">
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/quiz" element={<CategoryListPage />} />
                    <Route path="/quiz/:category" element={<QuizPage />} />
                    <Route path="/result" element={<ResultPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/oauthgoogle" element={<OAuthGoogleHandler />} />
                    <Route path="/oauthkakao" element={<OAuthKakaoHandler />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
