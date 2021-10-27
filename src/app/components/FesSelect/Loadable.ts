/**
 *
 * Asynchronously loads the component for FesSelect
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesSelect = lazyLoad(
  () => import('./index'),
  module => module.FesSelect,
);
