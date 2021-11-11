/**
 *
 * Asynchronously loads the component for ProfileSetting
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ProfileSetting = lazyLoad(
  () => import('./index'),
  module => module.ProfileSetting,
);
