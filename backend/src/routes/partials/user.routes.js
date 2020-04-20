const router = require("express").Router();
const passport = require("passport");
const { checkSchema } = require("express-validator");

const { idResourceSchema } = require("../../schemas/general.schema");
const {
    updateUserSchema,
    registerUserSchema,
    loginUserSchema
} = require("../../schemas/user.schema");

const {
    getOneController,
    getAllController,
    registerController,
    loginController,
    deleteController,
    updateController
} = require("../../controllers/user/main.controller");

const validate = require("../../middlewares/validate.middleware");
const validateUserOwner = require("../../middlewares/validate-user-owner.middleware");

router.get("/", getAllController);

router.post(
    "/register",
    checkSchema(registerUserSchema),
    validate,
    registerController
);

router.post("/login", checkSchema(loginUserSchema), validate, loginController);

router.use(passport.authenticate("jwt", { session: false }));

router.get(
    "/:id",
    checkSchema(idResourceSchema),
    validate,
    validateUserOwner,
    getOneController
);

router.delete("/", deleteController);

router.put("/", checkSchema(updateUserSchema), validate, updateController);

module.exports = router;
