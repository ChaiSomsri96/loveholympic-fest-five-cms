/**
 *
 * Asynchronously loads the component for Setting
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Setting = lazyLoad(
  () => import('./index'),
  module => module.Setting,
);
