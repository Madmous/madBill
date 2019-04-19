import { NextFunction, Request, Response } from 'express';
import Joi, { Schema } from 'joi';

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
