import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import Joi from 'joi';

const router = express();

router.use(cors({ origin: true, credentials: true }));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/save-invoice', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

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

  Joi.validate(req.body, schema, (err, _) => {
    if (err) {
      res.status(400).send({
        message: err.message,
      });
    } else {
      res.status(200).send();
    }
  });
});

export default router;
