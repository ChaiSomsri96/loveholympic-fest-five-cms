/**
 *
 * Asynchronously loads the component for DropdownIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DropdownIcon = lazyLoad(
  () => import('./index'),
  module => module.DropdownIcon,
);
