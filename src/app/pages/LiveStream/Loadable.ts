/**
 *
 * Asynchronously loads the component for LiveStream
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LiveStream = lazyLoad(
  () => import('./index'),
  module => module.LiveStream,
);
