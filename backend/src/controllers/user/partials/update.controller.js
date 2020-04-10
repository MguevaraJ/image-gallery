const User = require("mongoose").model("User");
const { encodePassword } = require("../../../lib/util.lib");
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { _id } = req.user;
        const { username, email } = req.body;
        const password = await encodePassword(req.body.password);

        const updatedUser = await User.findByIdAndUpdate(_id, {
            username,
            email,
            password
        });

        if (!updatedUser) NOT_FOUND(res, "The user you want to edit does not exist");
        else {
            OK(res, "User data has been updated correctly");
        }
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
