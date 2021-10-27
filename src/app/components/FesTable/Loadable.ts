/**
 *
 * Asynchronously loads the component for FesTable
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesTable = lazyLoad(
  () => import('./index'),
  module => module.FesTable,
);
