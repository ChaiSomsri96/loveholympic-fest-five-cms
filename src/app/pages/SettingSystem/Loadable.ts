/**
 *
 * Asynchronously loads the component for SettingSystem
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SettingSystem = lazyLoad(
  () => import('./index'),
  module => module.SettingSystem,
);
