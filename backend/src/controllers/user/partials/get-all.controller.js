const User = require("mongoose").model("User");
const { picturesPopulateFields } = require("../../../lib/util.lib");
const { 
    OK, 
    NO_CONTENT, 
    INTERNAL_SERVER_ERROR 
} = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const users = await User.find(
            {},
            { password: false, privatePictures: false }
        );
        const usersPopulate = await User.populate(users, {
            path: "publicPictures",
            select: picturesPopulateFields
        });

        if (usersPopulate.length)
            OK(res, null, usersPopulate);
        else NO_CONTENT(res);
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message)
    }
};
