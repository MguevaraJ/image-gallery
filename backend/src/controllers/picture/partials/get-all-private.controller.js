module.exports = async (req, res) => {
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
};
