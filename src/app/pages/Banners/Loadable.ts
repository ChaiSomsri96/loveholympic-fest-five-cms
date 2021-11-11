/**
 *
 * Asynchronously loads the component for Banners
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Banners = lazyLoad(
  () => import('./index'),
  module => module.Banners,
);
