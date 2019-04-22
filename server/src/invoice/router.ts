import { Router } from 'express';
import invoiceResponseHandler from './handler';
import validateSchema from './validate-schema';

export default (router: Router) => {
  router.post(
    '/save-invoice',
    validateSchema,
    invoiceResponseHandler
  );
};

