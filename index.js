import config from './common/config/env.config.js';
import express, { json } from 'express';
const app = express();
import connectWithRetry from './common/services/mongoose.service'
import routesConfig from './authorization/routes.config';
import { routesConfig as _routesConfig } from './users/routes.config';

app.use(json());
routesConfig(app);
_routesConfig(app);

app.listen(config.port, () => {
  console.log(`app is listening on port ${config.port}`);
});
