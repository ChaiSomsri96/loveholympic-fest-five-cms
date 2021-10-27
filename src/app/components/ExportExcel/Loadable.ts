/**
 *
 * Asynchronously loads the component for ExportExcel
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ExportExcel = lazyLoad(
  () => import('./index'),
  module => module.ExportExcel,
);
