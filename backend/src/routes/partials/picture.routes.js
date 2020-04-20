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
const validatePictureOwner = require("../../middlewares/validate-picture-owner.middleware");

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
    validatePictureOwner,
    getOnePrivateController
);

router.post(
    "/create",
    checkSchema(createPictureSchema),
    validate,
    createController
);

router.delete(
    "/:id",
    checkSchema(idResourceSchema),
    validate,
    validatePictureOwner,
    deleteController
);

router.put(
    "/:id",
    checkSchema(idResourceSchema),
    checkSchema(updatePictureSchema),
    validate,
    validatePictureOwner,
    updateController
);

module.exports = router;
