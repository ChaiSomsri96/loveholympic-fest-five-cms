/**
 *
 * Asynchronously loads the component for GoldenTicket
 *
 */

import { lazyLoad } from 'utils/loadable';

export const GoldenTicket = lazyLoad(
  () => import('./index'),
  module => module.GoldenTicket,
);
