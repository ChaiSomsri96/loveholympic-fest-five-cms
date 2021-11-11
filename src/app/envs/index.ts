import DEV_ENV from './env.dev';
import STG_ENV from './env.stg';
import LOCAL_ENV from './env.local';

let env = {
  URL_API: '',
};

switch (process.env.REACT_APP_NODE_ENV) {
  case 'develop':
    env = DEV_ENV;
    break;
  case 'staging':
    env = STG_ENV;
    break;
  default:
    env = LOCAL_ENV;
    break;
}

export default env;
