/**
 *
 * Asynchronously loads the component for ListComment
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ListComment = lazyLoad(
  () => import('./index'),
  module => module.ListComment,
);
