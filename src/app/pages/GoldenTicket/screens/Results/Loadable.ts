/**
 *
 * Asynchronously loads the component for Results
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Results = lazyLoad(
  () => import('./index'),
  module => module.Results,
);
