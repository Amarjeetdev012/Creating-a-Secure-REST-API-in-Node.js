import ADMIN_PERMISSION from '../config/env.config';

const minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    const user_permission_level = req.jwt.permissionLevel;
    if (user_permission_level & required_permission_level) {
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
  const user_permission_level = parseInt(req.jwt.permissionLevel);
  const userId = req.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId) {
    return next();
  } else {
    if (user_permission_level & ADMIN_PERMISSION) {
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
