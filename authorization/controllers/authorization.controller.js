import jwt from 'jsonwebtoken';
import config from '../../common/config/env.config';
import { randomBytes, createHmac } from 'crypto';
const { sign } = jwt;
const jwtSecret = config.jwt_secret;

const login = (req, res) => {
  try {
    const refreshId = req.body.userId + jwtSecret;
    const salt = randomBytes(16).toString('base64');
    const hash = createHmac('sha512', salt).update(refreshId).digest('base64');
    req.body.refreshKey = salt;
    const token = sign(req.body, jwtSecret);
    const b = Buffer.from(hash);
    const refresh_token = b.toString('base64');
    res.status(201).send({ accessToken: token, refreshToken: refresh_token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

const refresh_token = (req, res) => {
  try {
    req.body = req.jwt;
    const token = sign(req.body, jwtSecret);
    res.status(201).send({ id: token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

export { refresh_token, login };
