const Picture = require("mongoose").model("Picture");
const { userPopulateFields } = require("../../../lib/util.lib");
const { OK, INTERNAL_SERVER_ERROR } = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const { pictures } = req.user;
        const picture = req.picture;

        OK(res, picture);
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
