/**
 *
 * Asynchronously loads the component for Notifications
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Notifications = lazyLoad(
  () => import('./index'),
  module => module.Notifications,
);
