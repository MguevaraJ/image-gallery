const User = require("mongoose").model("User");
const { picturesPopulateFields } = require("../../../lib/util.lib");
const { 
    OK, 
    NOT_FOUND, 
    INTERNAL_SERVER_ERROR 
} = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id, {
            password: false,
            privatePictures: false
        });

        if (!user) NOT_FOUND(res, "The requesting user does not exist");
        else {
            const userPopulate = await User.populate(user, {
                path: "publicPictures",
                select: picturesPopulateFields
            });
            OK(res, null, userPopulate); 
        }
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
