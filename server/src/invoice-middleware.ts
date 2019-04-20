import { NextFunction, Request, Response } from 'express';
import jwt from 'express-jwt';
import Joi, { Schema } from 'joi';
import jwksRsa from 'jwks-rsa';

import config from '../config';

export default (schema: Schema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Joi.validate(req.body, schema, (err, _) => {
    if (err) {
      res.locals.validationError = err.message;
      next();
    } else {
      next();
    }
  });
};

export const checkJwt = jwt({
  algorithms: ['RS256'],
  audience: config.auth.clientId,
  issuer: `https://${config.auth.domain}/`,
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.auth.domain}/.well-known/jwks.json`,
    rateLimit: true,
  }),
});
