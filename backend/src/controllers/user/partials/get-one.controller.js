module.exports = async (req, res) => {
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
};
