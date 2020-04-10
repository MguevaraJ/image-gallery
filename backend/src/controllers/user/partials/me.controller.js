const User = require("mongoose").model("User");
const { picturesPopulateFields } = require("../../../lib/util.lib");
const { OK, INTERNAL_SERVER_ERROR } = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        req.user.password = undefined;

        const user = await User.populate(req.user, {
            path: "privatePictures",
            select: picturesPopulateFields
        });
        const populateUser = await User.populate(user, {
            path: "publicPictures",
            select: picturesPopulateFields
        });

        OK(res, null, populateUser);
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
