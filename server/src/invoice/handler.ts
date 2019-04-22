import { Request, Response } from 'express';

import create from '../pdf/create';

import template from '../pdf/template';
import createFormValues from './create-form-values';

export default async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');

  const { validationError } = res.locals;

  if (validationError) {
    res.status(400).send({
      message: validationError,
    });

    return;
  }

  const formValues = createFormValues(req.body);
  const pdf = await create(template(formValues));

  res
    .set({
      'Content-Length': pdf.length,
      'Content-Type': 'application/pdf',
    })
    .status(200)
    .send(pdf);
};
