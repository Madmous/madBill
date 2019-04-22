import { Request, Response, Router } from 'express';

import create from '../pdf/create';

import template from '../template';
import invoiceResponseHandler from './handler';
import validateSchema from './validate-schema';

export default (router: Router) => {
  router.post(
    '/save-invoice',
    validateSchema,
    invoiceResponseHandler
  );

  router.get('/send-pdf', async (_: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');

    const pdf = await create(template);

    res.set({
      'Content-Length': pdf.length,
      'Content-Type': 'application/pdf',
    });
    res.send(pdf);

    res.status(200).send();
  });
};

