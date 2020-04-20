const Picture = require("mongoose").model("Picture");
const User = require("mongoose").model("User");
const {
    CREATED,
    INTERNAL_SERVER_ERROR
} = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        let { _id: userId, privatePictures, publicPictures } = req.user;
        const { title, description, url, private } = req.body;

        const newPicture = new Picture({
            owner: userId,
            title,
            description,
            url,
            private
        });

        await newPicture.save();

        await User.findByIdAndUpdate(userId, {
            $push: {
                pictures: newPicture._id
            }
        });

        CREATED(res, "Your photo has been successfully uploaded");
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
