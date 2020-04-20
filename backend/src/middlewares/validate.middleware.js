const { validationResult } = require("express-validator");
const {
    INTERNAL_SERVER_ERROR,
    UNPROCESSABLE_ENTITY
} = require("../lib/responses.lib");

const format = ({ location, msg, param, value }) => {
    return `'${location}/${value}/${param}': ${msg}`;
};

module.exports = (req, res, next) => {
    try {
        const validation = validationResult(req).formatWith(format);

        if (!validation.isEmpty()) {
            UNPROCESSABLE_ENTITY(
                res,
                validation.array({ onlyFirstError: true })
            );
        } else next();
    } catch (err) {
        INTERNAL_SERVER_ERROR(res, err.message);
    }
};
