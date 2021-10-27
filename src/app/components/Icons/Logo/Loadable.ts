/**
 *
 * Asynchronously loads the component for Logo
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Logo = lazyLoad(
  () => import('./index'),
  module => module.Logo,
);
