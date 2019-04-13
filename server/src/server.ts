import router from "./index";
import logger from "./logger";

const port = 8080;

router.listen(port, () => {
  logger.info(`server started at http://localhost:${port}`);
});
