import { Router } from 'express';
import invoiceResponseHandler from './invoice-handler';
import createValidatePayload, { checkJwt } from './invoice-middleware';
import schema from './invoice-schema';

const validatePayload = createValidatePayload(schema);

export default (router: Router) => {
  router.post(
    '/save-invoice',
    checkJwt,
    validatePayload,
    invoiceResponseHandler
  );
};
