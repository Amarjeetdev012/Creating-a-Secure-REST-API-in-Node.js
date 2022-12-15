import {
  list,
  insert,
  getById,
  patchById,
  removeById,
} from './controllers/users.controller';
import {
  onlySameUserOrAdminCanDoThisAction,
  minimumPermissionLevelRequired,
} from '../common/middlewares/auth.permission.middleware';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware';
import config from '../common/config/env.config';
const admin = config.PERMISSION_LEVELS.ADMIN;
const paid = config.PERMISSION_LEVELS.PAID_USER;
const free = config.PERMISSION_LEVELS.NORMAL_USER;

const routesConfig = (app) => {
  app.post('/users', insert);

  app.get('/users', validJWTNeeded, minimumPermissionLevelRequired(paid), list);

  app.get(
    '/users/:userId',
    validJWTNeeded,
    onlySameUserOrAdminCanDoThisAction,
    getById
  );

  app.patch(
    '/users/:userId',
    validJWTNeeded,
    onlySameUserOrAdminCanDoThisAction,
    patchById
  );

  app.delete(
    '/users/:userId',
    validJWTNeeded,
    minimumPermissionLevelRequired(admin),
    removeById
  );
};

export { routesConfig };
