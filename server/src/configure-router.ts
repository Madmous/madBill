import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import { Router } from 'express';
import { reqLogger} from './invoice-middleware'

export default (router: Router) => {
  router.use(cors({ origin: '*' }));

  router.use(helmet());

  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
  router.use(reqLogger);
};
