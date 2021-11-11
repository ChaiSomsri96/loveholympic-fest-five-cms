/**
 *
 * Asynchronously loads the component for ListBanner
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ListBanner = lazyLoad(
  () => import('./index'),
  module => module.ListBanner,
);
