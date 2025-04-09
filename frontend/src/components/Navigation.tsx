import { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../api/auth";
import logo from "../assets/logo.svg";

const Navigation = memo(() => {
    // const [isLogin, setIsLogin] = useState(false);
    const { isLogin, setIsLogin } = useAuth();
    const navigate = useNavigate();
    // const location = useLocation();

    // const navLinks = [
    //     { path: "/", label: "Home" },
    //     { path: "/quiz", label: "Quiz" },
    // ];

    useEffect(() => {
        console.log("Navigation[isLogin] ---> ", isLogin);
        // const user = localStorage.getItem("user");
        // setIsLogin(!!user);
    }, [isLogin]);

    const handleLogout = async () => {
        console.log("Navigation[handleLogout] ---> ", isLogin);

        try {
            const data = await logout();
            console.log("로그아웃 성공:", data);

            setIsLogin(false);
            // localStorage.removeItem("user");
            navigate("/");
        } catch (err) {
            alert("로그아웃 실패");
            console.error(err);
        }

        setIsLogin(false);
        navigate("/");
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
                    {!isLogin ? (
                        <>
                            <Link to="/login" className="text-black text-lg">
                                Login
                            </Link>
                            <Link to="/register" className="text-black text-lg">
                                Register
                            </Link>
                        </>
                    ) : (
                        <Link to="/logout" onClick={handleLogout} className="text-black text-lg">
                            Logout
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
});

export default Navigation;
