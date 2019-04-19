import Joi from 'joi';

import { Router } from 'express';
import schema from './invoice-schema';

export default (router: Router) => {
  router.post('/save-invoice', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

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
};
