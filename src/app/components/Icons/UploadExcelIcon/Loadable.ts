/**
 *
 * Asynchronously loads the component for UploadExcelIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UploadExcelIcon = lazyLoad(
  () => import('./index'),
  module => module.UploadExcelIcon,
);
