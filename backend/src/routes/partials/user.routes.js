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
    meController,
    getOneController,
    getAllController,
    registerController,
    loginController,
    deleteController,
    updateController
} = require("../../controllers/user/main.controller");

const validate = require("../../middlewares/validate.middleware");

router.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    meController
);

router.get("/", getAllController);

router.get("/:id", checkSchema(idResourceSchema), getOneController);

router.post(
    "/register",
    checkSchema(registerUserSchema),
    validate,
    registerController
);

router.post("/login", checkSchema(loginUserSchema), validate, loginController);

router.use(passport.authenticate("jwt", { session: false }));

router.delete("/delete", deleteController);

router.put(
    "/update",
    checkSchema(updateUserSchema),
    validate,
    updateController
);

module.exports = router;
