const User = require("mongoose").model("User");
const { 
    OK, 
    NOT_FOUND, 
    INTERNAL_SERVER_ERROR 
} = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { _id } = req.user;

        const user = await User.findByIdAndDelete(_id);

        if (!user) NOT_FOUND(res, "The user you want to delete does not exist");
        else {
            OK(res, "User data has been successfully deleted");
        }
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
