/**
 *
 * Asynchronously loads the component for FesDatePicker
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesDatePicker = lazyLoad(
  () => import('./index'),
  module => module.FesDatePicker,
);
