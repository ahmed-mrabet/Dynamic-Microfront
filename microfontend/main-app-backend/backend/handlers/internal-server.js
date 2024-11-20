class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name; 
        this.statusCode = 500; 
        this.isOperational = true; 
        Error.captureStackTrace(this, this.constructor); 
    }
}
module.exports = InternalServerError;