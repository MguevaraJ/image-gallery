const jwt = require("jsonwebtoken");
const { genSalt, hash, compare } = require("bcryptjs");

const { ValidationError } = require("./errors.lib");

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

const stringToBoolean = string => {
    if(!string) return undefined;

    if(string === "true") return true
    else if(string === "false") return false;
    else throw new ValidationError(false, "Private field dont have correct format");
}

module.exports = {
    issueJWT,
    encodePassword,
    comparePassword,
    stringToBoolean
};
