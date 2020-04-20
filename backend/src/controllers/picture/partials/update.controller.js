const Picture = require("mongoose").model("Picture");
const {
    OK,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR
} = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { _id: pictureId } = req.picture;
        const { title, description, url, private } = req.body;

        await Picture.findByIdAndUpdate(pictureId, {
            title,
            description,
            url,
            private
        });
        OK(res);
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
