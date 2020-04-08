const { validationResult } = require("express-validator");
const { UnprocessableEntity } = require("http-errors");

const format = ({ location, msg, param, value }) => {
    return `'${location}/${value}/${param}': ${msg}`;
};

module.exports = (req, res, next) => {
    try {
        const validation = validationResult(req).formatWith(format);

        if (!validation.isEmpty()) {
            throw new UnprocessableEntity(validation.array());
        }
        next();
    } catch (err) {
        res.status(err.status).json({
            statusMessage: err.name,
            validate: false,
            message: err.message
        });
    }
};
