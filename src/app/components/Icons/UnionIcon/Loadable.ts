/**
 *
 * Asynchronously loads the component for UnionIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UnionIcon = lazyLoad(
  () => import('./index'),
  module => module.UnionIcon,
);
