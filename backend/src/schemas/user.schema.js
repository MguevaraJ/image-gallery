const {
    errorMessages: { length, format, required }
} = require("../lib/util.lib");

const updateUserSchema = {
    username: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        isLength: {
            options: {
                min: 4,
                max: 15
            },
            errorMessage: length(4, 15)
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
                min: 10,
                max: 40
            },
            errorMessage: length(10, 40)
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
                max: 60
            },
            errorMessage: length(8, 60)
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
                min: 4,
                max: 15
            },
            errorMessage: length(4, 15)
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
                min: 10,
                max: 40
            },
            errorMessage: length(10, 40)
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
                max: 60
            },
            errorMessage: length(8, 60)
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
                min: 10,
                max: 40
            },
            errorMessage: length(10, 40)
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
                max: 60
            },
            errorMessage: length(8, 60)
        },
        errorMessage: required
    }
};

module.exports = {
    updateUserSchema,
    registerUserSchema,
    loginUserSchema
};
