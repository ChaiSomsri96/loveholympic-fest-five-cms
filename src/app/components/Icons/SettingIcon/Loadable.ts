/**
 *
 * Asynchronously loads the component for SettingIcon
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SettingIcon = lazyLoad(
  () => import('./index'),
  module => module.SettingIcon,
);
