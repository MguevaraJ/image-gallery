module.exports = async (req, res) => {
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
};
