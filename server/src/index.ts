import express from 'express';
import configureRouter from './configure-router';
import configureRoutes from './configure-routes';

const router = express();

configureRouter(router);
configureRoutes(router);

export default router;
