const Picture = require("mongoose").model("Picture");
const { picturePopulateFields } = require("../../../lib/util.lib");
const { OK, NO_CONTENT, INTERNAL_SERVER_ERROR } = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const populateUser = await Picture.populate(req.user, {
            path: "privatePictures",
            select: picturePopulateFields
        });
        const { privatePictures } = populateUser;

        if (privatePictures.length) OK(res, null, privatePictures);
        else NO_CONTENT(res);
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
