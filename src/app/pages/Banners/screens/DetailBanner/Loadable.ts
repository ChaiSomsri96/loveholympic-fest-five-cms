/**
 *
 * Asynchronously loads the component for DetailBanner
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DetailBanner = lazyLoad(
  () => import('./index'),
  module => module.DetailBanner,
);
