/**
 *
 * Asynchronously loads the component for FesModal
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesModal = lazyLoad(
  () => import('./index'),
  module => module.FesModal,
);
