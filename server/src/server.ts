import router from "./index";
import logger from "./logger";

const port = process.env.PORT || 3000;

router.listen(port, () => {
  logger.info(`Listening on ${port}`);
});
