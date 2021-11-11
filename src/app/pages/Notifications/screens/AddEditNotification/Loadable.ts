/**
 *
 * Asynchronously loads the component for NotificationDetail
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AddEditNotification = lazyLoad(
  () => import('./index'),
  module => module.AddEditNotification,
);
