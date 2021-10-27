/**
 *
 * Asynchronously loads the component for EditIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const EditIcon = lazyLoad(
  () => import('./index'),
  module => module.EditIcon,
);
