import { Request, Response } from 'express';

export default (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');

  const { validationError } = res.locals;

  if (validationError) {
    res.status(400).send({
      message: validationError,
    });

    return;
  }

  res.status(200).send();
};
