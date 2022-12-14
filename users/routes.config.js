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
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

const routesConfig = (app) => {
  app.post('/users', insert);

  app.get('/users', validJWTNeeded, minimumPermissionLevelRequired(PAID), list);

  app.get(
    '/users/:userId',
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    onlySameUserOrAdminCanDoThisAction,
    getById
  );

  app.patch(
    '/users/:userId',
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    onlySameUserOrAdminCanDoThisAction,
    patchById
  );

  app.delete(
    '/users/:userId',
    validJWTNeeded,
    minimumPermissionLevelRequired(ADMIN),
    removeById
  );
};

export { routesConfig };
