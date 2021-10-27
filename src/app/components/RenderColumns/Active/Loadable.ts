/**
 *
 * Asynchronously loads the component for Active
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Active = lazyLoad(
  () => import('./index'),
  module => module.Active,
);
