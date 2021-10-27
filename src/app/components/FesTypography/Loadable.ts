/**
 *
 * Asynchronously loads the component for FesTypography
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesTypography = lazyLoad(
  () => import('./index'),
  module => module.FesTypography,
);
