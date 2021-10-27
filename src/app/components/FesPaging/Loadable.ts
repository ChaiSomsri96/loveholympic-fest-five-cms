/**
 *
 * Asynchronously loads the component for FesPaging
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesPaging = lazyLoad(
  () => import('./index'),
  module => module.FesPaging,
);
