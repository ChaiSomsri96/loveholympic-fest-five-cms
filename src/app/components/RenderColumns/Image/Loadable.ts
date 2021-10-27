/**
 *
 * Asynchronously loads the component for Image
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Image = lazyLoad(
  () => import('./index'),
  module => module.Image,
);
