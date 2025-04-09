import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserMe } from "../api/auth";

interface AuthContextType {
    isLogin: boolean;
    setIsLogin: (login: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
    isLogin: false,
    setIsLogin: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await getUserMe();
                setIsLogin(res?.success ?? false);
            } catch {
                setIsLogin(false);
            }
        };
        checkLogin();
    }, []);

    return <AuthContext.Provider value={{ isLogin, setIsLogin }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
