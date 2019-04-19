import { Router } from 'express';
import invoiceResponseHandler from './invoice-handler';
import schema from './invoice-schema';
import createValidatePayload from './invoice-validation-middleware';

const validatePayload = createValidatePayload(schema);

export default (router: Router) => {
  router.post('/save-invoice', validatePayload, invoiceResponseHandler);
};
