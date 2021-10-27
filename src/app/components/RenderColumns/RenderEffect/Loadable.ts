/**
 *
 * Asynchronously loads the component for RenderEffect
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RenderEffect = lazyLoad(
  () => import('./index'),
  module => module.RenderEffect,
);
