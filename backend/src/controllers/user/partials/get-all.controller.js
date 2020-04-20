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
            { password: false }
        )
        .populate({
            path: "pictures",
            select: picturesPopulateFields,
            match: {
                private: false
            }
        });

        if (users.length)
            OK(res, null, users);
        else NO_CONTENT(res);
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message)
    }
};
