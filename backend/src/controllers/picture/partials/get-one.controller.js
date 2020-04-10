const Picture = require("mongoose").model("Picture");
const { userPopulateFields } = require("../../../lib/util.lib");
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        const picture = await Picture.find({
            _id: id,
            private: false
        }).populate({ path: "owner", select: userPopulateFields });

        if (!picture) NOT_FOUND(res, "The photo you are trying to obtain does not exist");
        else OK(res, null, picture);
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
