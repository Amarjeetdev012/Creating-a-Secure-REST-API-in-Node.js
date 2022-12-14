import config from './common/config/env.config.js';
import express, { json } from 'express';
import connectWithRetry from './common/services/mongoose.service';
import routesConfig from './authorization/routes.config';
import { routesConfig as _routesConfig } from './users/routes.config';

const app = express();
connectWithRetry();
app.use(json());
routesConfig(app);
_routesConfig(app);

let PORT = config.port
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
