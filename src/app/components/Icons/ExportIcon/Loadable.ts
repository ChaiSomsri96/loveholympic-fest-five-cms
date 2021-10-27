/**
 *
 * Asynchronously loads the component for ExportIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ExportIcon = lazyLoad(
  () => import('./index'),
  module => module.ExportIcon,
);
