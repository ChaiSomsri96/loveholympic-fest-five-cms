/**
 *
 * Asynchronously loads the component for FesAction
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesAction = lazyLoad(
  () => import('./index'),
  module => module.FesAction,
);
