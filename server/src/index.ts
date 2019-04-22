import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import configureInvoice from './invoice/router';
import validateToken from './validate-token';

const router = express();

router.use(cors({ origin: '*' }));

router.use(morgan('combined'));

router.use(helmet());

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
  router.use(validateToken);
}

configureInvoice(router);

export default router;
