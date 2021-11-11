/**
 *
 * Asynchronously loads the component for ListUser
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ListUser = lazyLoad(
  () => import('./index'),
  module => module.ListUser,
);
