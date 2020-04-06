function ValidationError(state, message) {
    this.status = 400;
    this.statusMessage = "Bad Request";
    this.state = state;
    this.message = message || "Error in Data Provied";
}

function noExistResourceError(state, message) {
    this.status = 404;
    this.statusMessage = "Not Found";
    this.state = state;
    this.message = message || "Resource Doesn't Exist";
}

function UnknowError(state, message) {
    this.status = 500;
    this.statusMessage = "Internal Server Error";
    this.state = state;
    this.message = message || "An unexpected error has occurred";
}

module.exports = {
    ValidationError,
    noExistResourceError,
    UnknowError
};
