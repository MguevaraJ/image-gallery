module.exports = async (req, res) => {
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
};
