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
        const { isOwner } = req;
        const user = await User.findById(id, {
            password: false
        })
        .populate({ 
            path: "pictures", 
            select: picturesPopulateFields, 
            match: isOwner ? undefined : { private: false }
        });

        if (!user) NOT_FOUND(res, "The requesting user does not exist");
        else OK(res, null, user); 
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
}
