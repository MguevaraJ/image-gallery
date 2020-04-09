const User = require("mongoose").model("User");

const {
    ValidationError,
    noExistResourceError
} = require("../../lib/errors.lib");
const {
    issueJWT,
    encodePassword,
    comparePassword
} = require("../../lib/util.lib");

const picturesPopulateFields = [
    "_id",
    "title",
    "description",
    "url",
    "private"
];

const meController = require("./partials/me.controller");
const getOneController = require("./partials/get-one.controller");
const getAllController = require("./partials/get-all.controller");
const deleteController = require("./partials/delete.controller");
const updateController = require("./partials/update.controller");
const registerController = require("./partials/register.controller");
const loginController = require("./partials/login.controller");

module.exports = {
    meController,
    getOneController,
    getAllController,
    loginController,
    registerController,
    updateController,
    deleteController
};
