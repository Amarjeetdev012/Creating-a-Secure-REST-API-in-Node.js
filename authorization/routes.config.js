import {
  hasAuthValidFields,
  isPasswordAndUserMatch,
} from './middlewares/verify.user.middleware';
import { login } from './controllers/authorization.controller';
import {
  verifyRefreshBodyField,
  validRefreshNeeded,
  validJWTNeeded,
} from '../common/middlewares/auth.validation.middleware';
const routesConfig = (app) => {
  app.post('/auth', hasAuthValidFields, isPasswordAndUserMatch, login);

  app.post('/auth/refresh', [
    validJWTNeeded,
    verifyRefreshBodyField,
    validRefreshNeeded,
    login,
  ]);
};

export default routesConfig;
