module.exports = async (req, res) => {
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
};
