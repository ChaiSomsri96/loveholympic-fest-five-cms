/**
 *
 * Asynchronously loads the component for ImportCodeExcelModal
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ImportCodeExcelModal = lazyLoad(
  () => import('./index'),
  module => module.ImportCodeExcelModal,
);
