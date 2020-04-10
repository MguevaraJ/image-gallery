const Picture = require("mongoose").model("Picture");
const { userPopulateFields } = require("../../../lib/util.lib");
const { OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const { privatePictures } = req.user;

        if (privatePictures.length) {
            const idMatch = privatePictures.includes(id);

            if (idMatch) {
                const picture = await Picture.populate(req.user, {
                    path: "privatePictures"
                });
                const populatePicture = await Picture.populate(
                    picture.privatePictures,
                    { path: "owner", select: userPopulateFields }
                );
                OK(res, null, populatePicture);
            } else NOT_FOUND(res, "The photo you are trying to obtain does not exist in your photo log");
        } else NOT_CONTENT(res);
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
