import jwt from 'jsonwebtoken';
import config from '../config/env.config.js';
import crypto from 'crypto';
const secret = config.jwt_secret;

const verifyRefreshBodyField = (req, res, next) => {
  if (req.body && req.body.refresh_token) {
    return next();
  } else {
    return res.status(400).send({ error: 'need to pass refresh_token field' });
  }
};

const validRefreshNeeded = (req, res, next) => {
  let b = Buffer.from(req.body.refresh_token, 'base64');
  let refresh_token = b.toString();
  let hash = crypto
    .createHmac('sha512', req.jwt.refreshKey)
    .update(req.jwt.userId + secret)
    .digest('base64');
  if (hash === refresh_token) {
    req.body = req.jwt;
    return next();
  } else {
    return res.status(400).send({ error: 'Invalid refresh token' });
  }
};

const validJWTNeeded = (req, res, next) => {
  if (req.headers['authorization']) {
    try {
      const authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(authorization[1], secret);
        return next();
      }
    } catch (err) {
      return res
        .status(403)
        .send({ status: false, message: 'error from validjwtneeded' });
    }
  } else {
    return res.status(401).send();
  }
};

export { verifyRefreshBodyField, validRefreshNeeded, validJWTNeeded };
