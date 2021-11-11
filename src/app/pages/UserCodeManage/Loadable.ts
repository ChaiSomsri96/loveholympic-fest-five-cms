/**
 *
 * Asynchronously loads the component for CoderUserManagement
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UserCodeManage = lazyLoad(
  () => import('./index'),
  module => module.UserCodeManage,
);
