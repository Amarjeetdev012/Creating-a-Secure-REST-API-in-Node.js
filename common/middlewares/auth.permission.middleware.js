import config from '../config/env.config';
const AdminPermission = config.PERMISSION_LEVELS.ADMIN;

const minimumPermissionLevelRequired = (requiredPermissionLevel) => {
  return (req, res, next) => {
    const userPermissionLevel = req.jwt.permissionLevel;
    if (userPermissionLevel >= requiredPermissionLevel) {
      return next();
    } else {
      return res.status(403).send({
        status: false,
        message: 'error from mininimum permission level',
      });
    }
  };
};

const onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
  const userPermissionLevel = parseInt(req.jwt.permissionLevel);
  const userId = req.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId) {
    return next();
  } else {
    if (userPermissionLevel & AdminPermission) {
      return next();
    } else {
      return res.status(403).send();
    }
  }
};

const sameUserCantDoThisAction = (req, res, next) => {
  const userId = req.jwt.userId;
  if (req.params.userId !== userId) {
    return next();
  } else {
    return res.status(400).send();
  }
};

export {
  sameUserCantDoThisAction,
  onlySameUserOrAdminCanDoThisAction,
  minimumPermissionLevelRequired,
};
