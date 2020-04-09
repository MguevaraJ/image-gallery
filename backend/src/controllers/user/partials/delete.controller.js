module.exports = async (req, res) => {
    try {
        const { _id } = req.user;

        const user = await User.findByIdAndDelete(_id);

        if (!user) throw new noExistResourceError(false);
        else {
            res.status(200).json({
                deleted: true,
                message: "User Deleted"
            });
        }
    } catch (err) {
        res.status(err.status || 500).json({
            statusMessage: err.statusMessage || "Internal Server Error",
            deleted: err.state,
            message: err.message
        });
    }
} 
