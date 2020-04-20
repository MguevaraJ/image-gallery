const Picture = require("mongoose").model("Picture");
const { picturePopulateFields } = require("../../../lib/util.lib");
const {
    OK,
    NO_CONTENT,
    INTERNAL_SERVER_ERROR
} = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const populateUser = await Picture.populate(req.user, {
            path: "pictures",
            select: picturePopulateFields,
            match: {
                private: true
            }
        });
        const { pictures } = populateUser;

        if (pictures.length) OK(res, null, pictures);
        else NO_CONTENT(res);
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
