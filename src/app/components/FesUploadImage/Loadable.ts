/**
 *
 * Asynchronously loads the component for FesUploadImage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesUploadImage = lazyLoad(
  () => import('./index'),
  module => module.FesUploadImage,
);
