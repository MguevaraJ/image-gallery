const Picture = require("mongoose").model("Picture");
const { userPopulateFields } = require("../../../lib/util.lib");
const { OK, NO_CONTENT, INTERNAL_SERVER_ERROR } = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const pictures = await Picture.find({ private: false }).populate({
            path: "owner",
            select: userPopulateFields
        });

        if (pictures.length) OK(res, null, pictures);
        else NO_CONTENT(res);
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
