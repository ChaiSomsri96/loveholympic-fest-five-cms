/**
 *
 * Asynchronously loads the component for PenToolIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const PenToolIcon = lazyLoad(
  () => import('./index'),
  module => module.PenToolIcon,
);
