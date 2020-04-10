const User = require("mongoose").model("User");
const { issueJWT, comparePassword } = require("../../../lib/util.lib");
const {
    OK,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED
} = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
            NOT_FOUND(
                res,
                "User you want to access does not exist"
            );
        else {
            const isValid = await comparePassword(password, user.password);

            if (!isValid)
                UNAUTHORIZED(res, "The password provided is incorrect");
            else OK(res, "You have successfully entered", issueJWT(user));
        }
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
