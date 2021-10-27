/**
 *
 * Asynchronously loads the component for LogoutIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LogoutIcon = lazyLoad(
  () => import('./index'),
  module => module.LogoutIcon,
);
