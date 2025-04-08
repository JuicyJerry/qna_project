import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { User } from "../types/index";

const { KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET, KAKAO_REDIRECT_URL } = process.env;

passport.use(
    new KakaoStrategy(
        {
            clientID: KAKAO_CLIENT_ID!,
            clientSecret: KAKAO_CLIENT_SECRET, // 선택
            callbackURL: KAKAO_REDIRECT_URL!,
        },
        async (accessToken, refreshToken, profile, done) => {
            const user: User = {
                id: profile.id,
                email: profile._json?.kakao_account?.email,
                name: profile.username,
                provider: "kakao",
            };
            console.log("KakaoStrategy ---> ", user);
            return done(null, user);
        }
    )
);
