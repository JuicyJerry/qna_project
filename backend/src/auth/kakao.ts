import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { KakaoUser } from "../types/index";

const { KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET, KAKAO_REDIRECT_URL } = process.env;

passport.use(
    new KakaoStrategy(
        {
            clientID: KAKAO_CLIENT_ID!,
            clientSecret: KAKAO_CLIENT_SECRET, // 선택
            callbackURL: KAKAO_REDIRECT_URL!,
        },
        async (accessToken, refreshToken, profile, done) => {
            const user: KakaoUser = {
                id: profile.id,
                email: profile._json?.kakao_account?.email,
                name: profile.username || "Unknown",
                provider: "kakao",
            };
            console.log("KakaoStrategy ---> ", user);
            return done(null, user);
        }
    )
);
