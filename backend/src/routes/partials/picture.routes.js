const router = require("express").Router();
const passport = require("passport");
const { checkSchema } = require("express-validator");

const Picture = require("mongoose").model("Picture");
const User = require("mongoose").model("User");

const { idResourceSchema } = require("../../schemas/general.schema");
const {
    createPictureSchema,
    updatePictureSchema
} = require("../../schemas/picture.schema");

const { NO_CONTENT, OK, getStatusText } = require("http-status-codes");

const {
    ValidationError,
    noExistResourceError,
    UnknowError
} = require("../../lib/errors.lib");

const validate = require("../../middlewares/validate.middleware");

const userPopulateFields = ["_id", "username", "email"];
const picturePopulateFields = ["_id", "title", "description", "url", "private"];
const OK_MESSAGE = getStatusText(OK);
const NO_CONTENT_MESSAGE = getStatusText(NO_CONTENT);

router.get(
    "/private",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const populateUser = await Picture.populate(req.user, {
                path: "privatePictures",
                select: picturePopulateFields
            });
            const { privatePictures } = populateUser;

            if (privatePictures.length)
                res.status(OK).json({
                    statusMessage: OK_MESSAGE,
                    find: true,
                    privatePictures
                });
            else
                res.status(NO_CONTENT).json({
                    statusMessage: getStatusText(NO_CONTENT_MESSAGE),
                    find: false,
                    privatePictures
                });
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).json({
                statusMessage: getStatusText(INTERNAL_SERVER_ERROR),
                find: false,
                message: err.message
            });
        }
    }
);

router.get(
    "/private/:id",
    checkSchema(idResourceSchema),
    validate,
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { privatePictures } = req.user;

            if (privatePictures.length) {
                const idMatch = privatePictures.includes(id);

                if (idMatch) {
                    const picture = await Picture.populate(req.user, {
                        path: "privatePictures"
                    });
                    const populatePicture = await Picture.populate(
                        picture.privatePictures,
                        { path: "owner", select: userPopulateFields }
                    );

                    res.status(OK).json({
                        statusMessage: getStatusText(OK),
                        find: true,
                        data: populatePicture
                    });
                } else throw new noExistResourceError(false);
            } else {
                res.status(204).json({
                    statusMessage: "Not Content",
                    find: false,
                    data: []
                });
            }
        } catch (err) {
            res.status(err.status || 500).json({
                statusMessage: err.statusMessage || "Server Internal Error",
                find: err.state || false,
                message: err.message
            });
        }
    }
);

router.get("/", async (req, res) => {
    try {
        const pictures = await Picture.find({ private: false }).populate({
            path: "owner",
            select: userPopulateFields
        });

        if (pictures.length)
            res.status(200).json({
                statusMessage: "OK",
                find: true,
                data: pictures
            });
        else
            res.status(204).json({
                statusMessage: "Not Content",
                find: false,
                data: pictures
            });
    } catch (err) {
        res.status(500).json({
            statusMessage: "Internal Server Error",
            success: false,
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

            const picture = await Picture.find({
                _id: id,
                private: false
            }).populate({ path: "owner", select: userPopulateFields });

            if (!picture) throw new noExistResourceError(false);
            else
                res.status(200).json({
                    statusMessage: "OK",
                    find: true,
                    data: picture
                });
        } catch (err) {
            res.status(err.status || 500).json({
                statusMessage: err.statusMessage || "Internal Server Error",
                success: err.state,
                message: err.message
            });
        }
    }
);

router.use(passport.authenticate("jwt", { session: false }));

router.post(
    "/create",
    checkSchema(idResourceSchema),
    validate,
    async (req, res) => {
        try {
            let { id, privatePictures, publicPictures } = req.user;

            const { title, description, url, private } = req.body;

            const newPicture = new Picture({
                owner: id,
                title,
                description,
                url,
                private
            });

            await newPicture.save();

            if (newPicture.private) {
                privatePictures = [newPicture._id, ...privatePictures];
                await User.findByIdAndUpdate(id, {
                    privatePictures
                });
            } else {
                publicPictures = [newPicture._id, ...publicPictures];
                await User.findByIdAndUpdate(id, {
                    publicPictures
                });
            }
            res.status(201).json({
                statusMessage: "Created",
                created: true
            });
        } catch (err) {
            res.status(err.status || 500).json({
                statusMessage: err.statusMessage || "Internal Server Error",
                created: false,
                message: err.message
            });
        }
    }
);

router.delete(
    "/delete/:id",
    checkSchema(idResourceSchema),
    validate,
    async (req, res) => {
        try {
            const { id } = req.params;
            const { privatePictures, publicPictures, _id } = req.user;
            const excludePicture = picture => picture != id;
            let privatePictureMatch, publicPictureMatch;

            privatePictureMatch = privatePictures.includes(id);

            if (privatePictureMatch) {
                const newPrivatePictures = privatePictures.filter(
                    excludePicture
                );
                const updatedUser = await User.findByIdAndUpdate(_id, {
                    privatePictures: newPrivatePictures
                });

                if (!updatedUser) noExistResourceError(falsee);
            } else {
                publicPictureMatch = publicPictures.includes(id);

                if (publicPictureMatch) {
                    const newPublicPictures = publicPictures.filter(
                        excludePicture
                    );
                    const updatedUser = await User.findByIdAndUpdate(_id, {
                        publicPictures: newPublicPictures
                    });

                    if (!updatedUser) throw new noExistResourceError(false);
                } else {
                    throw new noExistResourceError(false);
                }
            }

            if (privatePictureMatch || publicPictureMatch) {
                const deletedPicture = await Picture.findByIdAndDelete(id);

                res.status(200).json({ statusMessage: "OK", deleted: true });
            } else {
                throw new UnknowError(false);
            }
        } catch (err) {
            res.status(err.status || 500).json({
                statusMessage: err.statusMessage || "Internal Server Error",
                deleted: false,
                message: err.message
            });
        }
    }
);

router.put(
    "/update/:id",
    checkSchema(idResourceSchema),
    checkSchema(updatePictureSchema),
    validate,
    (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, url, private } = req.body;
        } catch (err) {
            res.status(err.status || 500).json({
                statusMessage: err.statusMessage || "Internal Server Error",
                updated: false,
                message: err.message
            });
        }
    }
);

module.exports = router;
