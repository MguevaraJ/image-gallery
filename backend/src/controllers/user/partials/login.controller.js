module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new noExistResourceError(false);
        } else {
            const isValid = await comparePassword(password, user.password);

            if (!isValid) {
                throw new ValidationError(false, "Password is invalid");
            } else res.status(200).json(issueJWT(user));
        }
    } catch (err) {
        res.status(err.status || 500).json({
            statusMessage: err.statusMessage || "Internal Server Error",
            login: err.state,
            message: err.message
        });
    }
};
