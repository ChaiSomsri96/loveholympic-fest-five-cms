/**
 *
 * Asynchronously loads the component for CommentIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CommentIcon = lazyLoad(
  () => import('./index'),
  module => module.CommentIcon,
);
