import Joi from 'joi';

const itemSchema = Joi.object().keys({
  amount: Joi.number().required(),
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

export default schema;
