import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const itemSchema = Joi.object().keys({

  description: Joi.string().required(),
  quantity: Joi.number().required(),
  unitPrice: Joi.number().required(),
});

const schema = Joi.object().keys({
  billTo: Joi.string().required(),
  dueDate: Joi.string().required(),
  from: Joi.string().required(),
  invoiceDate: Joi.string().required(),
  invoiceNumber: Joi.string().required(),
  items: Joi.array()
    .items(itemSchema)
    .required(),
  shipTo: Joi.string().required(),
});

export default (req: Request, res: Response, next: NextFunction) => {
  Joi.validate(req.body, schema, (err, _) => {
    if (err) {
      res.locals.validationError = err.message;
      next();
    } else {
      next();
    }
  });
};
