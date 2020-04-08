const { length, format, required } = require("../lib/util.lib");

const updateUserSchema = {
    username: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        isLength: {
            options: {
                min: 5,
                max: 15
            },
            errorMessage: length(5, 15)
        },
        trim: true,
        escape: true,
        errorMessage: required
    },
    email: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        isLength: {
            options: {
                min: 20,
                max: 40
            },
            errorMessage: length(20, 40)
        },
        trim: true,
        isEmail: {
            errorMessage: format("email")
        },
        normalizeEmail: true,
        errorMessage: required
    },
    password: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        isLength: {
            options: {
                min: 8,
                max: 30
            },
            errorMessage: length(8, 30)
        },
        errorMessage: required
    }
};

const registerUserSchema = {
    username: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        trim: true,
        isLength: {
            options: {
                min: 5,
                max: 15
            },
            errorMessage: length(5, 15)
        },
        escape: true,
        errorMessage: required
    },
    email: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        trim: true,
        isLength: {
            options: {
                min: 20,
                max: 40
            },
            errorMessage: length(20, 40)
        },
        isEmail: {
            errorMessage: format("email")
        },
        normalizeEmail: true,
        errorMessage: required
    },
    password: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        isLength: {
            options: {
                min: 8,
                max: 30
            },
            errorMessage: length(8, 30)
        },
        errorMessage: required
    }
};

const loginUserSchema = {
    email: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        trim: true,
        isLength: {
            options: {
                min: 25,
                max: 40
            },
            errorMessage: length(25, 40)
        },
        isEmail: {
            errorMessage: format("email")
        },
        normalizeEmail: true,
        errorMessage: required
    },
    password: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        isLength: {
            options: {
                min: 8,
                max: 30
            },
            errorMessage: length(8, 30)
        },
        errorMessage: required
    }
};

module.exports = {
    updateUserSchema,
    registerUserSchema,
    loginUserSchema
};
