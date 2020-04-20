const Picture = require("mongoose").model("Picture");
const {
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    FORBIDDEN
} = require("../lib/responses.lib");

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;

        const picture = await Picture.findById(id);

        if (!picture) NOT_FOUND(res);
        else if (_id.equals(picture.owner)) {
            req.picture = picture;
            next();
        }
        else
            FORBIDDEN(
                res,
                "The photo you are trying to update does not exist in your photo log"
            );
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
