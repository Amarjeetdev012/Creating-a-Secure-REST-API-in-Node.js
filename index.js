const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');


app.use(express.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);


app.listen(config.port, function () {
    console.log(`app is listening on port ${config.port}`);
});