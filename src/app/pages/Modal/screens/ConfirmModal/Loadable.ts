/**
 *
 * Asynchronously loads the component for ConfirmModal
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ConfirmModal = lazyLoad(
  () => import('./index'),
  module => module.ConfirmModal,
);
