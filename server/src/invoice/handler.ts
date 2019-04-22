import { Request, Response } from 'express';

import create from '../pdf/create';

import template from '../template';

export default async (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');

  // console.log(req.user.email);

  const { validationError } = res.locals;

  if (validationError) {
    res.status(400).send({
      message: validationError,
    });

    return;
  }

  const pdf = await create(template);

  res
    .set({
      'Content-Length': pdf.length,
      'Content-Type': 'application/pdf',
    })
    .status(200)
    .send(pdf);
};
