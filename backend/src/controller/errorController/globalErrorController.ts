import { Response, Request, ErrorRequestHandler, NextFunction } from 'express';
import BaseError from '../../utils/BaseError';
import { ERROR_CODES } from '../../utils/constants';
const validationErrorDB = (err: BaseError) => {
  const errors = Object.values((err as any).errors).map((el: any) => el.path);
  const message = `Check input for ${errors}`;
  const error = new BaseError(400, message, ERROR_CODES.E10004);
  return error;
};

const sendClientError = (error: BaseError, req: Request, res: Response) => {
  res.status(error.statusCode).json({
    status: 'error',
    message: error.message,
    errorcode: error.errorCode,
  });
};

export default (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * TODO: Define error type
   * 1) Server error and
   * 2) Client Error
   */
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err = { ...err };
  if (err.name === 'ValidationError') {
    err = validationErrorDB(err);
  }

  sendClientError(err, req, res);
};
