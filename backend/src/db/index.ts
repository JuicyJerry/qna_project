import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/qna_project";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB 연결 완료");
    } catch (err) {
        console.error("MongoDB 연결 실패:", err);
        process.exit(1);
    }
};
