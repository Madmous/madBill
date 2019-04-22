import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import config from '../config';

const validateToken = jwt({
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

export default validateToken;
