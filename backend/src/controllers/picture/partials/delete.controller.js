module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const { privatePictures, publicPictures, _id } = req.user;
        const excludePicture = picture => picture != id;
        let privatePictureMatch, publicPictureMatch;

        privatePictureMatch = privatePictures.includes(id);

        if (privatePictureMatch) {
            const newPrivatePictures = privatePictures.filter(excludePicture);
            const updatedUser = await User.findByIdAndUpdate(_id, {
                privatePictures: newPrivatePictures
            });

            if (!updatedUser) noExistResourceError(falsee);
        } else {
            publicPictureMatch = publicPictures.includes(id);

            if (publicPictureMatch) {
                const newPublicPictures = publicPictures.filter(excludePicture);
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
};
