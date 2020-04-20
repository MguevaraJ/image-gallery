const  User = require("mongoose").model("User");
const { INTERNAL_SERVER_ERROR } = require("../lib/responses.lib");

module.exports = (req, res, next) => {
    try {
        const { id: reqUserId } = req.params;
        const { _id: userId } = req.user;
        
        if(userId.equals(reqUserId)) {
            req.isOwner = true;
            next();
        } else {
            req.isOwner = false;
            next();
        }
    } catch(err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
}
