const config = {
  PORT: 3600,
  APP_ENDPOINT: 'http://localhost:3600',
  API_ENDPOINT: 'http://localhost:3600',
  JWT: {
    SECRET: 'myS33!!creeeT',
    EXPIRATION_IN_SECONDS: 36000,
  },
  ENVIRONMENT: 'dev',
  PERMISSION_LEVELS: {
    NORMAL_USER: 1,
    PAID_USER: 4,
    ADMIN: 2048,
  },
};

export default config;
