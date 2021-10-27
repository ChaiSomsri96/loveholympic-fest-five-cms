/**
 *
 * Asynchronously loads the component for FesLoadingImage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesLoadingImage = lazyLoad(
  () => import('./index'),
  module => module.FesLoadingImage,
);
