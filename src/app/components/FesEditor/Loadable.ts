/**
 *
 * Asynchronously loads the component for FesEditor
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FesEditor = lazyLoad(
  () => import('./index'),
  module => module.FesEditor,
);
