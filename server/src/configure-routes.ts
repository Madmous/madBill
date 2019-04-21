import { Router } from 'express';
import invoiceResponseHandler from './invoice-handler';
import createValidatePayload, { checkJwt } from './invoice-middleware';
import schema from './invoice-schema';

const validatePayload = createValidatePayload(schema);

export default (router: Router) => {
  router.post(
    '/create-invoice',
    checkJwt,
    validatePayload,
    invoiceResponseHandler
  );
};
