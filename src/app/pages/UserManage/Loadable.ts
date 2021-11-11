/**
 *
 * Asynchronously loads the component for UserManage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UserManage = lazyLoad(
  () => import('./index'),
  module => module.UserManage,
);
