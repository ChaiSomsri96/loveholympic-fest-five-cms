/**
 *
 * Asynchronously loads the component for FesLoading
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesLoading = lazyLoad(
  () => import('./index'),
  module => module.FesLoading,
);
