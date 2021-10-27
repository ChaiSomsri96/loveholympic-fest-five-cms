/**
 *
 * Asynchronously loads the component for FesFileUpload
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesFileUpload = lazyLoad(
  () => import('./index'),
  module => module.FesFileUpload,
);
