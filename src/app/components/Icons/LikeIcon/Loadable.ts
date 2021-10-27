/**
 *
 * Asynchronously loads the component for LikeIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LikeIcon = lazyLoad(
  () => import('./index'),
  module => module.LikeIcon,
);
