class BaseError extends Error {
  public statusCode;
  public isOperational;
  public status;
  public errorCode;
  constructor(
    statusCode: number,
    message: string,
    errorCode: string,
    status?: string
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errorCode = errorCode;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BaseError;
