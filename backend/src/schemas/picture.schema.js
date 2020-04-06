const createPictureSchema = {
    id: "/create-picture",
    type: "object",
    properties: {
        title: {
            type: "string",
            minLength: 5,
            maxlength: 25
        },
        description: {
            type: "string",
            minLength: 25,
            maxlength: 100,
            default: ""
        },
        url: {
            type: "string"
        },
        private: {
            type: "boolean",
            default: false
        }
    },
    additionalProperties: false,
    required: ["title", "url", "private"]
};

module.exports = {
    createPictureSchema
};
