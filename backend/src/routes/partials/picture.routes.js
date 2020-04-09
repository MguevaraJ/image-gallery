const router = require("express").Router();
const passport = require("passport");
const { checkSchema } = require("express-validator");

const {
    getAllPrivateController,
    getOnePrivateController,
    getAllController,
    getOneController,
    createController,
    deleteController,
    updateController
} = require("../../controllers/picture/main.controller");

const {
    createPictureSchema,
    updatePictureSchema
} = require("../../schemas/picture.schema");

const { idResourceSchema } = require("../../schemas/general.schema");
const validate = require("../../middlewares/validate.middleware");

router.get("/public", getAllController);

router.get(
    "/public/:id",
    checkSchema(idResourceSchema),
    validate,
    getOneController
);

router.use(passport.authenticate("jwt", { session: false }));

router.get("/private", getAllPrivateController);

router.get(
    "/private/:id",
    checkSchema(idResourceSchema),
    validate,
    getOnePrivateController
);

router.post(
    "/create",
    checkSchema(idResourceSchema),
    validate,
    createController
);

router.delete(
    "/delete/:id",
    checkSchema(idResourceSchema),
    validate,
    deleteController
);

router.put(
    "/update/:id",
    checkSchema(idResourceSchema),
    checkSchema(updatePictureSchema),
    validate,
    updateController
);

module.exports = router;
