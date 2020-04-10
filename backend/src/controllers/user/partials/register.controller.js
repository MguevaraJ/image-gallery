const User = require("mongoose").model("User");
const { issueJWT, encodePassword } = require("../../../lib/util.lib");
const { OK, INTERNAL_SERVER_ERROR } = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username,
            email,
            password
        });

        newUser.password = await encodePassword(newUser.password);

        const user = await newUser.save();

        OK(res, "Your user has been created successfully", issueJWT(user));
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
