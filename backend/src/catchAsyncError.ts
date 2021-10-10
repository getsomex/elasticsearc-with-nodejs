import { Request, Response, NextFunction } from 'express';
import BaseError from './utils/BaseError';
export default (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch((err: BaseError) => {
      next(err);
    });
  };
};
