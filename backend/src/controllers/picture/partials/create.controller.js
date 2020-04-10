const Picture = require("mongoose").model("Picture");
const { CREATED, INTERNAL_SERVER_ERROR } = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        let { id, privatePictures, publicPictures } = req.user;

        const { title, description, url, private } = req.body;

        const newPicture = new Picture({
            owner: id,
            title,
            description,
            url,
            private
        });

        await newPicture.save();

        if (newPicture.private) {
            privatePictures = [newPicture._id, ...privatePictures];
            await User.findByIdAndUpdate(id, {
                privatePictures
            });
        } else {
            publicPictures = [newPicture._id, ...publicPictures];
            await User.findByIdAndUpdate(id, {
                publicPictures
            });
        }
        CREATED(res, "Your photo has been successfully uploaded");
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
