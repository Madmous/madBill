import express from "express";

const router = express();

router.get("/", (_, res) => {
  res.setHeader("Content-Type", "application/json");

  res.status(200);
  res.send({ message: "hello world" });
});

export default router;
