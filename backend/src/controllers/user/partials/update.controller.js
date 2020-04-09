module.exports = async (req, res) => {
    try {
        const { _id } = req.user;
        const { username, email } = req.body;
        const password = await encodePassword(req.body.password);

        const updatedUser = await User.findByIdAndUpdate(_id, {
            username,
            email,
            password
        });

        if (!updatedUser) throw new noExistResourceError(false);
        else {
            res.status(200).json({
                updated: true,
                message: "Users Updated"
            });
        }
    } catch (err) {
        res.status(err.status || 500).json({
            statusMessage: err.statusMessage || "Internal Server Error",
            updated: err.state,
            message: err.message
        });
    }
};
