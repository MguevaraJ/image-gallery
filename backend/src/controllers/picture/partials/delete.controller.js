const Picture = require("mongoose").model("Picture");
const User = require("mongoose").model("User");
const {
    OK,
    NOT_FOUND,
    UNAUTHORIZED,
    INTERNAL_SERVER_ERROR
} = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { _id: pictureId } = req.picture;
        const { _id: userId } = req.user;

        await User.findByIdAndUpdate(userId, {
            $pull: {
                pictures: pictureId
            }
        });

        const deletedPicture = await Picture.findByIdAndDelete(pictureId);
        OK(res, "Your photo has been successfully deleted");
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
