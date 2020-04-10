const jwt = require("jsonwebtoken");
const { genSalt, hash, compare } = require("bcryptjs");

const issueJWT = user => {
    const id = user._id;
    const expiresIn = "1d";

    const payload = {
        sub: id,
        at: Date.now()
    };

    const options = {
        expiresIn
    };

    const issuedJWT = jwt.sign(payload, process.env.JWT_SECRET, options);

    return {
        token: `Bearer ${issuedJWT}`,
        expiresIn
    };
};

const encodePassword = async password => {
    const salt = await genSalt(10);
    return await hash(password, salt);
};

async function comparePassword(password, encodePassword) {
    return await compare(password, encodePassword);
}

const errorMessages = {
    required: "property is required",
    length: (min, max) =>
        `property should be between '${min}' and '${max}' character`,
    format: format => `property does not comply with the '${format}' format`,
    type: type => `property should be '${type}' type`
};

const picturePopulateFields = ["_id", "title", "description", "url", "private"];
const userPopulateFields = ["_id", "username", "email"];

module.exports = {
    issueJWT,
    encodePassword,
    comparePassword,
    errorMessages,
    picturePopulateFields,
    userPopulateFields
};
