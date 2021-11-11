/**
 *
 * Asynchronously loads the component for InfoUser
 *
 */

import { lazyLoad } from 'utils/loadable';

export const InfoUser = lazyLoad(
  () => import('./index'),
  module => module.InfoUser,
);
