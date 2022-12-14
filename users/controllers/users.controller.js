import {
  findByEmail,
  createUser,
  list as list1,
  findById,
  removeById as removeById1,
  patchUser,
} from '../models/users.model';
import mongoose from 'mongoose';
import crypto from 'crypto';

const insert = async (req, res) => {
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto
    .createHmac('sha512', salt)
    .update(req.body.password)
    .digest('base64');
  req.body.password = salt + '$' + hash;
  req.body.permissionLevel = 1;
  const data = req.body.email;
  const findEmail = await findByEmail(data);
  if (findEmail.length) {
    return res.status(400).send({
      status: false,
      message: 'this emailid is already registered please use new one',
    });
  }
  createUser(req.body).then((result) => {
    res.status(201).send({ id: result._id });
  });
};

const list = (req, res) => {
  const limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  const page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  list1(limit, page).then((result) => {
    res.status(200).send(result);
  });
};

const getById = (req, res) => {
  findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};
const patchById = (req, res) => {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto
      .createHmac('sha512', salt)
      .update(req.body.password)
      .digest('base64');
    req.body.password = salt + '$' + hash;
  }

  patchUser(req.params.userId, req.body).then((result) => {
    res.status(200).send({ result });
  });
};

const removeById = (req, res) => {
  removeById1(req.params.userId).then((result) => {
    res.status(204).send({});
  });
};

export { removeById, patchById, getById, list, insert };
