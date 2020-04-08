const router = require("express").Router();
const passport = require("passport");
const { checkSchema } = require("express-validator");

const User = require("mongoose").model("User");

const { idResourceSchema } = require("../../schemas/general.schema");

const {
    updateUserSchema,
    registerUserSchema,
    loginUserSchema
} = require("../../schemas/user.schema");

const {
    ValidationError,
    noExistResourceError
} = require("../../lib/errors.lib");

const {
    issueJWT,
    encodePassword,
    comparePassword
} = require("../../lib/util.lib");

const validate = require("../../middlewares/validate.middleware");

const picturesPopulateFields = [
    "_id",
    "title",
    "description",
    "url",
    "private"
];

router.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        req.user.password = undefined;

        const user = await User.populate(req.user, {
            path: "privatePictures",
            select: picturesPopulateFields
        });
        const populateUser = await User.populate(user, {
            path: "publicPictures",
            select: picturesPopulateFields
        });

        res.json({ find: true, data: populateUser });
    }
);

router.get("/", async (req, res) => {
    try {
        const users = await User.find(
            {},
            { password: false, privatePictures: false }
        );
        const usersPopulate = await User.populate(users, {
            path: "publicPictures",
            select: picturesPopulateFields
        });

        if (usersPopulate.length)
            res.status(200).json({ find: true, data: usersPopulate });
        else res.status(204).json({ find: false, data: usersPopulate });
    } catch (err) {
        res.status(500).json({
            statusMessage: "Internal Server Error",
            find: false,
            message: err.message
        });
    }
});

router.get(
    "/:id",
    checkSchema(idResourceSchema),
    validate,
    async (req, res) => {
        try {
            const { id } = req.params;

            const user = await User.findById(id, {
                password: false,
                privatePictures: false
            });

            if (!user) throw new noExistResourceError(false);
            else {
                const userPopulate = await User.populate(user, {
                    path: "publicPictures",
                    select: picturesPopulateFields
                });
                res.status(200).json({ find: true, data: userPopulate });
            }
        } catch (err) {
            res.status(err.status || 500).json({
                statusMessage: err.statusMessage || "Internal Server Error",
                find: err.state,
                message: err.message
            });
        }
    }
);

router.post(
    "/register",
    checkSchema(registerUserSchema),
    validate,
    async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const newUser = new User({
                username,
                email,
                password
            });

            newUser.password = await encodePassword(newUser.password);

            const user = await newUser.save();

            res.status(201).json(issueJWT(user));
        } catch (err) {
            res.status(err.status || 500).json({
                statusMessage: err.statusMessage || "Internal Server Error",
                register: err.state,
                message: err.message
            });
        }
    }
);

router.post(
    "/login",
    checkSchema(loginUserSchema),
    validate,
    async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                throw new noExistResourceError(false);
            } else {
                const isValid = await comparePassword(password, user.password);

                if (!isValid) {
                    throw new ValidationError(false, "Password is invalid");
                } else res.status(200).json(issueJWT(user));
            }
        } catch (err) {
            res.status(err.status || 500).json({
                statusMessage: err.statusMessage || "Internal Server Error",
                login: err.state,
                message: err.message
            });
        }
    }
);

router.use(passport.authenticate("jwt", { session: false }));

router.delete("/delete", async (req, res) => {
    try {
        const { _id } = req.user;

        const user = await User.findByIdAndDelete(_id);

        if (!user) throw new noExistResourceError(false);
        else {
            res.status(200).json({
                deleted: true,
                message: "User Deleted"
            });
        }
    } catch (err) {
        res.status(err.status || 500).json({
            statusMessage: err.statusMessage || "Internal Server Error",
            deleted: err.state,
            message: err.message
        });
    }
});

router.put(
    "/update",
    checkSchema(updateUserSchema),
    validate,
    async (req, res) => {
        try {
            const { _id } = req.user;
            const { username, email } = req.body;
            const password = await encodePassword(req.body.password);

            const updatedUser = await User.findByIdAndUpdate(_id, {
                username,
                email,
                password
            });

            if (!updatedUser) throw new noExistResourceError(false);
            else {
                res.status(200).json({
                    updated: true,
                    message: "Users Updated"
                });
            }
        } catch (err) {
            res.status(err.status || 500).json({
                statusMessage: err.statusMessage || "Internal Server Error",
                updated: err.state,
                message: err.message
            });
        }
    }
);

module.exports = router;
