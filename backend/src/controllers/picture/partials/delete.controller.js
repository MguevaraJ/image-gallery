const Picture = require("mongoose").model("Picture");
const User = require("mongoose").model("User");
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const { privatePictures, publicPictures, _id } = req.user;
        const excludePicture = picture => picture != id;
        let privatePictureMatch, publicPictureMatch;

        privatePictureMatch = privatePictures.includes(id);

        if (privatePictureMatch) {
            const newPrivatePictures = privatePictures.filter(excludePicture);
            const updatedUser = await User.findByIdAndUpdate(_id, {
                privatePictures: newPrivatePictures
            });
        } else {
            publicPictureMatch = publicPictures.includes(id);

            if (publicPictureMatch) {
                const newPublicPictures = publicPictures.filter(excludePicture);
                const updatedUser = await User.findByIdAndUpdate(_id, {
                    publicPictures: newPublicPictures
                });
            } else {
                NOT_FOUND(res, "The photo you are trying to delete does not exist in your photo log");
            }
        }

        if (privatePictureMatch || publicPictureMatch) {
            const deletedPicture = await Picture.findByIdAndDelete(id);
            OK(res, "Your photo has been successfully deleted");
        } 
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
