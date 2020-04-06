const updateUserSchema = {
    id: "/update-user",
    type: "object",
    properties: {
        username: {
            type: "string",
            minLength: 5,
            maxLength: 15
        },
        email: {
            type: "string",
            format: "email",
            maxLength: 40
        },
        password: {
            type: "string",
            minLength: 8,
            maxLength: 30
        }
    },
    additionalProperties: false,
    required: ["username", "email", "password"]
};

const registerUserSchema = {
    id: "/register-user",
    type: "object",
    properties: {
        username: {
            type: "string",
            minLength: 5,
            maxLength: 15
        },
        email: {
            type: "string",
            format: "email",
            maxLength: 40
        },
        password: {
            type: "string",
            minLength: 8,
            maxLength: 30
        }
    },
    additionalProperties: false,
    required: ["username", "email", "password"]
};

const loginUserSchema = {
    id: "/login-user",
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
            maxLength: 40
        },
        password: {
            type: "string",
            minLength: 8,
            maxLength: 30
        }
    },
    additionalProperties: false,
    required: ["email", "password"]
};

module.exports = {
    updateUserSchema,
    registerUserSchema,
    loginUserSchema
};
