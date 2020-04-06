const idResourceSchema = {
    id: "/idResourceSchema",
    type: "object",
    properties: {
        id: {
            type: "string",
            pattern: /^[0-9a-fA-F]{24}$/
        }
    },
    additionalProperties: false,
    required: ["id"]

}

module.exports = {
    idResourceSchema
};
