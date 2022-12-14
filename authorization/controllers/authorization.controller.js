import  sign  from 'jsonwebtoken';
import { randomBytes, createHmac } from 'crypto';

export function login(req, res) {
  try {
    const refreshId = req.body.userId + jwtSecret;
    const salt = randomBytes(16).toString('base64');
    const hash = createHmac('sha512', salt)
      .update(refreshId)
      .digest('base64');
    req.body.refreshKey = salt;
    const token = sign(req.body, jwtSecret);
    const b = Buffer.from(hash);
    const refresh_token = b.toString('base64');
    res.status(201).send({ accessToken: token, refreshToken: refresh_token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}

export function refresh_token(req, res) {
  try {
    req.body = req.jwt;
    const token = sign(req.body, jwtSecret);
    res.status(201).send({ id: token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}
