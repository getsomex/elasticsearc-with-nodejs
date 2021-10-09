import { Response, Request, ErrorRequestHandler, NextFunction } from 'express';

export default (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * Define error type
   * 1) Server error and
   * 2) Client Erro
   */
  console.log(err);
  res.status(500).json({
    message: 'Error something went wrong 🧨',
  });
};
