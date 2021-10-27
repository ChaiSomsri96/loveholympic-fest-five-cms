/**
 *
 * Asynchronously loads the component for ArrowUpIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ArrowUpIcon = lazyLoad(
  () => import('./index'),
  module => module.ArrowUpIcon,
);
