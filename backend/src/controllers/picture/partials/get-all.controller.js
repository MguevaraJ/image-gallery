module.exports = async (req, res) => {
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
};
