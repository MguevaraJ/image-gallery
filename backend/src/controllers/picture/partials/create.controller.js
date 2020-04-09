module.exports = async (req, res) => {
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
};
