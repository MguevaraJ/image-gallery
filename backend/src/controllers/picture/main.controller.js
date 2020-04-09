const Picture = require("mongoose").model("Picture");
const User = require("mongoose").model("User");
const { NO_CONTENT, OK, getStatusText } = require("http-status-codes");

const {
    ValidationError,
    noExistResourceError,
    UnknowError
} = require("../../lib/errors.lib");

const userPopulateFields = ["_id", "username", "email"];
const picturePopulateFields = ["_id", "title", "description", "url", "private"];
const OK_MESSAGE = getStatusText(OK);
const NO_CONTENT_MESSAGE = getStatusText(NO_CONTENT);

const getAllPrivateController = require("./partials/get-all-private.controller");
const getOnePrivateController = require("./partials/get-one-private.controller");
const getAllController = require("./partials/get-all.controller");
const getOneController = require("./partials/get-one.controller");
const createController = require("./partials/create.controller");
const deleteController = require("./partials/delete.controller");
const updateController = require("./partials/update.controller");

module.exports = {
    getAllPrivateController,
    getOnePrivateController,
    getAllController,
    getOneController,
    createController,
    deleteController,
    updateController
};
