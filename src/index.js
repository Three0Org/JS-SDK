import { initContract as initNear } from './NEAR';
import * as Database from './database';
import * as Auth from './auth';

const init = async (projectConfig) => {
  switch (projectConfig.chainType) {
    case 'NEAR_TESTNET':
      await initNear(projectConfig);
      break;
    default:
      throw Error(`Unconfigured chainType '${projectConfig.chainType}'`);
  }

  await Auth.initAuth();

  const ipfs = await Database.initIPFS();
  await Database.initOrbitDB(ipfs, projectConfig.chainType, Auth.isLoggedIn());
};

export {
  Database as DB,
  Auth as AUTH,
  init,
};
