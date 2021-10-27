/**
 *
 * Asynchronously loads the component for FesInput
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesInput = lazyLoad(
  () => import('./index'),
  module => module.FesInput,
);
