class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name; 
        this.statusCode = 401; 
        this.isOperational = true; 
        Error.captureStackTrace(this, this.constructor); 
    }
}
module.exports = UnauthorizedError;