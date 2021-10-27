/**
 *
 * Asynchronously loads the component for ToggleMenuIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ToggleMenuIcon = lazyLoad(
  () => import('./index'),
  module => module.ToggleMenuIcon,
);
