/**
 *
 * Asynchronously loads the component for UploadImage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UploadImage = lazyLoad(
  () => import('./index'),
  module => module.UploadImage,
);
