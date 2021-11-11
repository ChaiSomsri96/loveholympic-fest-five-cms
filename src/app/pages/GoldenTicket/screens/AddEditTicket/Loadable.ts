/**
 *
 * Asynchronously loads the component for AddEditTicket
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AddEditTicket = lazyLoad(
  () => import('./index'),
  module => module.AddEditTicket,
);
