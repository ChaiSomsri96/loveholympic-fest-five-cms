/**
 *
 * Asynchronously loads the component for SetSmsUserModal
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SetSmsUserModal = lazyLoad(
  () => import('./index'),
  module => module.SetSmsUserModal,
);
