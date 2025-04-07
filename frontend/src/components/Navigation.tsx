import { memo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import React from "react";

const Navigation = memo(() => {
    const [isLogin, setIsLogin] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/quiz", label: "Quiz" },
    ];

    useEffect(() => {
        // const user = localStorage.getItem("user");
        // setIsLogin(!!user);
    }, []);

    const onClickHandler = () => {
        // 로그아웃 로직 여기에 추가
        localStorage.removeItem("user");
        setIsLogin(false);
    };

    return (
        <nav className="w-full fixed top-0 left-0 z-[999] bg-white shadow">
            <div className="max-w-[1140px] mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="overflow-hidden max-h-14">
                    <img className="h-14 max-h-14 scale-[1.8]" src={logo} alt="QNA logo" />
                </Link>

                <div className="flex gap-4">
                    <Link to="/" className="text-black text-lg">
                        Home
                    </Link>
                    <Link to="/quiz" className="text-black text-lg">
                        Quiz
                    </Link>
                </div>

                <div className="flex gap-2 items-center">
                    <Link to="/login" className="text-black text-lg">
                        Login
                    </Link>
                    <Link to="/register" className="text-black text-lg">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
});

export default Navigation;
