import dotenv from 'dotenv';

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`
});

const config = {
  auth: {
    clientId: process.env.AUTH_CLIENT_ID,
    domain: process.env.AUTH_DOMAIN,
  }
}

export default config;
