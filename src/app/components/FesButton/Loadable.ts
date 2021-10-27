/**
 *
 * Asynchronously loads the component for FesButton
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesButton = lazyLoad(
  () => import('./index'),
  module => module.FesButton,
);
