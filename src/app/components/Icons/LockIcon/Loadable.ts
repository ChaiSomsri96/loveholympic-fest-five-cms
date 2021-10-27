/**
 *
 * Asynchronously loads the component for LockIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LockIcon = lazyLoad(
  () => import('./index'),
  module => module.LockIcon,
);
