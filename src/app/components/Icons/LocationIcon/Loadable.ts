/**
 *
 * Asynchronously loads the component for LocationIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LocationIcon = lazyLoad(
  () => import('./index'),
  module => module.LocationIcon,
);
