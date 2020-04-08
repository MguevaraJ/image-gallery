const { length, format, required, type } = require("../lib/util.lib");

const createPictureSchema = {
    title: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        trim: true,
        isLength: {
            options: {
                min: 5,
                max: 25
            },
            errorMessage: length(5, 25)
        },
        escape: true,
        errorMessage: required
    },
    description: {
        in: ["body"],
        optional: {
            options: {
                nullable: true
            }
        },
        trim: true,
        isLength: {
            options: {
                min: 25,
                max: 100
            },
            errorMessage: length(25, 100)
        },
        escape: true
    },
    url: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        trim: true,
        escape: true,
        errorMessage: required
    },
    private: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        isBoolean: {
            errorMessage: type("boolean")
        },
        toBoolean: true,
        errorMessage: required
    }
};

const updatePictureSchema = {
    title: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        trim: true,
        isLength: {
            options: {
                min: 5,
                max: 25
            },
            errorMessage: length(5, 25)
        },
        escape: true,
        errorMessage: required
    },
    description: {
        in: ["bodu"],
        optional: {
            options: {
                nullable: true
            }
        },
        trim: true,
        isLength: {
            options: {
                min: 25,
                max: 100
            },
            errorMessage: length(25, 100)
        },
        escape: true
    },
    url: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        trim: true,
        escape: true,
        errorMessage: required
    },
    private: {
        in: ["body"],
        isEmpty: {
            negated: true
        },
        isBoolean: {
            errorMessage: type("boolean")
        },
        toBoolean: true,
        errorMessage: required
    }
};

module.exports = {
    createPictureSchema,
    updatePictureSchema
};
