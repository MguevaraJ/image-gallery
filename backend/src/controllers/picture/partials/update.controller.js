const User = require("mongoose").model("User");
const Picture = require("mongoose").model("Picture");
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require("../../../lib/responses.lib");

module.exports = async (req, res) => {
    try {
        const { _id } = req.user;
        const { id } = req.params;
        const { title, description, url, private } = req.body;
        const picture = await Picture.findById(id);
        console.log(`${picture._id} === _id`);
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
