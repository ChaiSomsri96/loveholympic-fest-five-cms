/**
 *
 * Asynchronously loads the component for DateTime
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DateTime = lazyLoad(
  () => import('./index'),
  module => module.DateTime,
);
