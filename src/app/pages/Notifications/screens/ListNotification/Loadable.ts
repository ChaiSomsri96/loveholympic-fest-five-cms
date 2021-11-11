/**
 *
 * Asynchronously loads the component for ListNotification
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ListNotification = lazyLoad(
  () => import('./index'),
  module => module.ListNotification,
);
