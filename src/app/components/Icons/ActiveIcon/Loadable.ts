/**
 *
 * Asynchronously loads the component for ActiveIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ActiveIcon = lazyLoad(
  () => import('./index'),
  module => module.ActiveIcon,
);
