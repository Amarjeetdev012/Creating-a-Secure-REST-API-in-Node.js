import config from './common/config/env.config.js';
import express, { json } from 'express';
import connectWithRetry from './common/services/mongoose.service';
import routesConfig from './authorization/routes.config';
import { routesConfig as userRoutesConfig } from './users/routes.config';

const app = express();
connectWithRetry();
app.use(json());
routesConfig(app);
userRoutesConfig(app);

let port = config.PORT
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
