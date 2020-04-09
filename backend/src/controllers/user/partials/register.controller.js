module.exports = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username,
            email,
            password
        });

        newUser.password = await encodePassword(newUser.password);

        const user = await newUser.save();

        res.status(201).json(issueJWT(user));
    } catch (err) {
        res.status(err.status || 500).json({
            statusMessage: err.statusMessage || "Internal Server Error",
            register: err.state,
            message: err.message
        });
    }
};
