const { format } = require("../lib/util.lib");

const idResourceSchema = {
    id: {
        in: ["params"],
        isEmpty: {
            negated: true
        },
        isMongoId: true,
        errorMessage: format("ObjectId")
    }
};

module.exports = {
    idResourceSchema
};
