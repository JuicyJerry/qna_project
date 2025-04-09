import React, { useEffect, useState } from "react";

interface EmailTimerProps {
    initialTime?: number;
    onExpire: () => void;
}

const EmailTimer = ({ initialTime = 180, onExpire }: EmailTimerProps) => {
    const [secondsLeft, setSecondsLeft] = useState(initialTime);

    useEffect(() => {
        if (secondsLeft <= 0) {
            onExpire();
            return;
        }

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft, onExpire]);

    const formatTime = (secs: number) => {
        const m = String(Math.floor(secs / 60)).padStart(2, "0");
        const s = String(secs % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    return <p className="text-xs text-red-500 mt-1">남은 시간: {formatTime(secondsLeft)}</p>;
};

export default EmailTimer;
