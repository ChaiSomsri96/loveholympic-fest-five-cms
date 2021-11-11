/**
 *
 * Asynchronously loads the component for Authorize
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Authorize = lazyLoad(
  () => import('./index'),
  module => module.Authorize,
);
