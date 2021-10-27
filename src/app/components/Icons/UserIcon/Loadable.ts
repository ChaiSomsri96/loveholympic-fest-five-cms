/**
 *
 * Asynchronously loads the component for UserIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UserIcon = lazyLoad(
  () => import('./index'),
  module => module.UserIcon,
);
