module.exports = async (req, res) => {
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
};
