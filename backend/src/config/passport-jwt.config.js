const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("mongoose").model("User");

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new JWTStrategy(options, async (payload, next) => {
            try {
                const user = await User.findById(payload.sub);

                if (!user) next(null, false);

                return next(null, user);
            } catch (err) {
                next(err, false);
            }
        })
    );
};
