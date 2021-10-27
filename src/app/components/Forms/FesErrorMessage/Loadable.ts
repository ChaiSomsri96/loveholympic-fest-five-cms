/**
 *
 * Asynchronously loads the component for FesErrorMessage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesErrorMessage = lazyLoad(
  () => import('./index'),
  module => module.FesErrorMessage,
);
