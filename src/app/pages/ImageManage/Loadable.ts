/**
 *
 * Asynchronously loads the component for ImangeManage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ImageManage = lazyLoad(
  () => import('./index'),
  module => module.ImageManage,
);
