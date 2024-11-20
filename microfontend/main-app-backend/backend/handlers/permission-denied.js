class PermissionDeniedError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name; 
        this.statusCode = 403; 
        this.isOperational = true; 
        Error.captureStackTrace(this, this.constructor); 
    }
}
module.exports = PermissionDeniedError;