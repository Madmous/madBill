import { NextFunction, Request, Response } from 'express';
import Joi, { Schema } from 'joi';

import logger from "./logger";

export default (schema: Schema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Joi.validate(req.body, schema, (err, _) => {
    if (err) {
      res.locals.validationError = err.message;
      next();
    } else {
      next();
    }
  });
};

export const reqLogger = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  logger.info(`Requesting ${req.method} on ${req.path}`);
  next();
};