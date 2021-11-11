/**
 *
 * Asynchronously loads the component for QuestionManage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const QuestionManage = lazyLoad(
  () => import('./index'),
  module => module.QuestionManage,
);
