/**
 *
 * Asynchronously loads the component for ErrManage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ErrManage = lazyLoad(
  () => import('./index'),
  module => module.ErrManage,
);
