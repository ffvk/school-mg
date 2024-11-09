import { registerAs } from '@nestjs/config';

let config = {
  localhost: {
    port: 4107,
    uploadLimit: '250mb',
    env: 'localhost',
    uiUrl: 'http://localhost:8100',
  },
  dev: {
    port: 4107,
    uploadLimit: '250mb',
    env: 'dev',
    uiUrl: 'http://oh.fordelstudios.com',
  },
};

export default registerAs(
  'app',
  () => config[process.env.NODE_ENV || 'dev'] || config['dev'],
);
