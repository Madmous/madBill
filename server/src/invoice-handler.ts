import { Request, Response } from 'express';

export default async (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');

  // console.log(req.user.email);

  const { validationError } = res.locals;

  if (validationError) {
    res.status(400).send({
      message: validationError,
    });

    return;
  }

  res.status(200).send();
};
