/**
 *
 * Asynchronously loads the component for Stt
 *
 */

import { lazyLoad } from 'utils/loadable';

export const No = lazyLoad(
  () => import('./index'),
  module => module.No,
);
