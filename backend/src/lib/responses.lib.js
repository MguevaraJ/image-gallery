function OK(res, message, data) {
    const metadata = {
        code: 200,
        statusMessage: "OK",
        success: true,
        message: message || undefined,
        data: data || "The request has been processed correctly" 
    };

    res.status(metadata.code).json(metadata);
};

function NO_CONTENT(res, message) {
    const metadata = {
        code: 204,
        statusMessage: "No Content",
        success: true,
        message: message || "The request has been processed correctly but has no content",
    };

    res.status(metadata.code).json(metadata);
};

function CREATED(res, message) {
    const metadata = {
        code: 201,
        statusMessage: "Created",
        success: true,
        message: message || "The request was processed successfully and resulted in the creation of a resource",
    };

    res.status(metadata.code).json(metadata);
};

function BAD_REQUEST(res, message) {
    const metadata = {
        code: 400,
        statusMessage: "Bad Request",
        success: false,
        message: message || "The server will not process the request due to a client error",
    };

    res.status(metadata.code).json(metadata);
};

function UNAUTHORIZED(res, message) {
    const metadata = {
        code: 401,
        statusMessage: "Unauthorized",
        success: false,
        message: message || "An error occurred in the authentication of your data"
    };

    res.status(metadata.code).json(metadata);
};

function NOT_FOUND(res, message) {
    const metadata = {
        code: 404,
        statusMessage: "Not Found",
        success: true,
        message: message || "The resource you are requesting has not been found",
    };

    res.status(metadata.code).json(metadata);
};

function UNPROCESSABLE_ENTITY(res, message) {
    const metadata = {
        code: 422,
        statusMessage: "Unprocessable Entity",
        success: false,
        message: message || "The request was processed correctly but there was an error in the data provided by the client",
    };

    res.status(metadata.code).json(metadata);
};

function INTERNAL_SERVER_ERROR(res, message) {
    const metadata = {
        code: 500,
        statusMessage: "Internal Server Error",
        success: false,
        message: message || "An unexpected server error has occurred",
    };

    res.status(metadata.code).json(metadata);
};

module.exports = {
    OK,
    NO_CONTENT,
    CREATED,
    BAD_REQUEST,
    UNAUTHORIZED,
    NOT_FOUND,
    UNPROCESSABLE_ENTITY,
    INTERNAL_SERVER_ERROR
};
