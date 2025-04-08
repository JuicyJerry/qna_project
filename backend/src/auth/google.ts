import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../types/index";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
console.log(GOOGLE_CLIENT_ID);
console.log(GOOGLE_CLIENT_SECRET);
console.log(GOOGLE_REDIRECT_URL);

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!,
            callbackURL: GOOGLE_REDIRECT_URL!,
        },
        async (accessToken, refreshToken, profile, done) => {
            // 👇 여기에 유저 DB 저장 or 조회 로직
            const user = {
                id: profile.id,
                email: profile.emails?.[0].value,
                name: profile.displayName,
                provider: "google",
            };

            // console.log("accessToken ---> ", accessToken);
            // console.log("refreshToken ---> ", refreshToken);
            // console.log("profile ---> ", profile);
            console.log("GoogleStrategy ---> ", user);
            done(null, user);
        }
    )
);
