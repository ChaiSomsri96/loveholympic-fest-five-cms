/**
 *
 * DateTime
 *
 */
import React, { memo } from 'react';
import { formatDate } from 'app/constants';

interface Props {
  data?: any;
}

export const DateTime = memo((props: Props) => {
  const { data } = props;

  return <span>{formatDate(data)}</span>;
});
