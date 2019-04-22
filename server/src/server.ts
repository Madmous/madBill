import router from './index';
import logger from './logger';

const port = process.env.PORT || 8080;

router.listen(port, () => {
  logger.info(`Listening on ${port}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection at:', reason)
});
