const router = require("express").Router();
const passport = require("passport");
const validate = require("jsonschema").validate;

const Picture = require("mongoose").model("Picture");
const User = require("mongoose").model("User");

const { objectIdIsValid, stringToBoolean } = require("../../lib/util.lib");

const { createPictureSchema } = require("../../schemas/picture.schema");

const {
    ValidationError,
    noExistResourceError,
    UnknowError
} = require("../../lib/errors.lib");

const userPopulateFields =  ["_id", "username", "email"];
const picturePopulateFields = ["_id", "title", "description", "url", "private"];

router.get("/private", 
    passport.authenticate("jwt", { session: false }), 
    async (req, res) => {
    try {
        const populateUser = await Picture.populate(req.user, { path: "privatePictures", select: picturePopulateFields });
        const { privatePictures } = populateUser;

        if(privatePictures.length) res.status(200).json({ statusMessage: "OK", find: true, privatePictures });
        else res.status(204).json({ statusMessage: "Not Content", find: false, privatePictures });
    } catch (err) {
        res.status(500).json({
            statusMessage: "Internal Server Error",
            find: false,
            message: err.message
        });
    }
});

router.get("/private/:id", 
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    try {
        const { id } = req.params;
        const { privatePictures } = req.user;

        if(objectIdIsValid(id)) {
            if(privatePictures.length) {
                const idMatch = privatePictures.includes(id);

                if(idMatch) {
                    const picture = await Picture.populate(req.user, { path: "privatePictures" });
                    const populatePicture = await Picture.populate(picture.privatePictures, { path: "owner", select: userPopulateFields });

                    console.log(populatePicture);

                    res.status(200).json({ statusMessage: "OK", find: true, data: populatePicture });
                } else throw new noExistResourceError(false);
            } else {
                res.status(204).json({ statusMessage: "Not Content", find: false, data: [] });
            }
        } else {
            throw new ValidationError(false, "Id provied don't have correct format")
        }
    } catch(err) {
        res.status(err.status || 500).json({ 
            statusMessage: err.statusMessage || "Server Internal Error", 
            find: err.state || false, 
            message: err.message 
        });
    } 
});

router.get("/", async (req, res) => {
    try {
        const pictures = await Picture.find(
            { private: false },
        ).populate({ path: "owner", select: userPopulateFields});

        if (pictures.length)
            res.status(200).json({ statusMessage: "OK", find: true, data: pictures });
        else res.status(204).json({ statusMessage: "Not Content", find: false, data: pictures });
    } catch (err) {
        res.status(500).json({
            statusMessage: "Internal Server Error",
            success: false,
            message: err.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
    
        if(objectIdIsValid(id)) {

            const picture = await Picture.find({ _id: id, private: false })
            .populate({ path: "owner", select: userPopulateFields });

            if (!picture) throw new noExistResourceError(false);
            else res.status(200).json({ statusMessage: "OK", find: true, data: picture });
        } else {
            throw new ValidationError(false, "Id provied don't have correct format");
        }
    } catch (err) {
        res.status(err.status || 500).json({
            statusMessage: err.statusMessage || "Internal Server Error",
            success: err.state,
            message: err.message
        });
    }
});

router.use(passport.authenticate("jwt", { session: false }));

router.post("/create", async (req, res) => {
    try {
        req.body.private = stringToBoolean(req.body.private);
        
        let { id, privatePictures, publicPictures } = req.user;
        const validation = validate(req.body, createPictureSchema);
        const isValid = validation.valid;

        if (isValid) {
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
                privatePictures = [
                    newPicture._id,
                    ...privatePictures
                ];
                await User.findByIdAndUpdate(id, {
                    privatePictures
                });
            } else {
                publicPictures = [
                    newPicture._id,
                    ...publicPictures
                ];
                await User.findByIdAndUpdate(id, {
                    publicPictures
                });
            }
            res.status(201).json({
                statusMessage: "Created",
                created: true
            });
        } else {
            const errors = validation.errors.map(error => error.message);
            throw new ValidationError(false, errors);
        }
    } catch (err) {
        res.status(err.status || 500).json({
            statusMessage: err.statusMessage || "Internal Server Error",
            created: false,
            message: err.message
        });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { privatePictures, publicPictures, _id } = req.user;
        const excludePicture = picture => picture != id;
        let privatePictureMatch, publicPictureMatch;

        if(objectIdIsValid(id)) {
            privatePictureMatch = privatePictures.includes(id);
            
            if(privatePictureMatch) {
                const newPrivatePictures = privatePictures.filter(excludePicture);
                const updatedUser = await User.findByIdAndUpdate(_id, { 
                    privatePictures: newPrivatePictures 
                });

                if(!updatedUser) noExistResourceError(falsee);
            } else {
                publicPictureMatch = publicPictures.includes(id);

                if(publicPictureMatch) {
                    const newPublicPictures = publicPictures.filter(excludePicture);
                    const updatedUser = await User.findByIdAndUpdate(_id, { 
                        publicPictures: newPublicPictures 
                    });

                    if(!updatedUser) throw new noExistResourceError(false);
                } else {
                    throw new noExistResourceError(false);
                }
            }

            if(privatePictureMatch || publicPictureMatch) {
                const deletedPicture = await Picture.findByIdAndDelete(id);

                res.status(200).json({ statusMessage: "OK", deleted: true });
            } else {
                throw new UnknowError(false);
            }
        } else {
            throw new ValidationError(false, "Id provied don't have correct format");
        }
    } catch (err) {
        res.status(err.status || 500).json({ 
            statusMessage: err.statusMessage || "Internal Server Error", 
            deleted: false, 
            message: err.message });
    }
});

module.exports = router;
