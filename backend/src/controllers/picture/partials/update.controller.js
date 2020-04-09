module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, url, private } = req.body;
    } catch (err) {
        res.status(err.status || 500).json({
            statusMessage: err.statusMessage || "Internal Server Error",
            updated: false,
            message: err.message
        });
    }
};
