import { NextFunction, Request, Response } from 'express';
import jwt from 'express-jwt';
import Joi, { Schema } from 'joi';
import jwksRsa from 'jwks-rsa';

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

const YOUR_AUTH0_DOMAIN = 'madmous-dev.eu.auth0.com';
const YOUR_AUTH0_CLIENT_ID = 'o241Sx0W2TILGrPVXzplFXwOcGLIkyG6';

export const checkJwt = jwt({
  algorithms: ['RS256'],
  audience: YOUR_AUTH0_CLIENT_ID,
  issuer: `https://${YOUR_AUTH0_DOMAIN}/`,
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${YOUR_AUTH0_DOMAIN}/.well-known/jwks.json`,
    rateLimit: true,
  }),
});
