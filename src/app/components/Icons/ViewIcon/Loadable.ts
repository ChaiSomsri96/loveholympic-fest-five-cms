/**
 *
 * Asynchronously loads the component for ViewIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ViewIcon = lazyLoad(
  () => import('./index'),
  module => module.ViewIcon,
);
