import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import { Router } from 'express';

export default (router: Router) => {
  router.use(helmet());

  router.use(cors({ origin: true, credentials: true }));

  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
};
