import bodyParser from 'body-parser';
import cors from 'cors';
import { Router } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { checkJwt } from './invoice-middleware';

export default (router: Router) => {
  router.use(cors({ origin: '*' }));

  router.use(morgan('combined'));

  router.use(helmet());

  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  router.use(checkJwt);
};
