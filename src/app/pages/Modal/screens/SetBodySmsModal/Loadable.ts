/**
 *
 * Asynchronously loads the component for SetBodySmsModal
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SetBodySmsModal = lazyLoad(
  () => import('./index'),
  module => module.SetBodySmsModal,
);
