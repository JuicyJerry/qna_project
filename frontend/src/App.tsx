import React from "react";
import { Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import CategoryListPage from "./pages/CategoryListPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import ResultPage from "./pages/ResultPage";

function App() {
    return (
        <div className="h-screen flex justify-center items-center mt-[88px]">
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<CategoryListPage />} />
                <Route path="/quiz/:category" element={<QuizPage />} />
                <Route path="/result" element={<ResultPage />} />
            </Routes>
        </div>
    );
}

export default App;
