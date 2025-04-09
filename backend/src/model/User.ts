import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        nickname: { type: String, required: true },
        password: { type: String, required: true },
        provider: { type: String, enum: ["local", "google", "kakao"], default: "local" },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
