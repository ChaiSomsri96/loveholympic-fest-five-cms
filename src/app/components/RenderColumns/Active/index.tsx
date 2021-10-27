/**
 *
 * Active
 *
 */
import { ActiveIcon } from 'app/components/Icons';
import React, { memo } from 'react';

interface Props {
  isActive: boolean;
}

export const Active = memo((props: Props) => {
  const { isActive } = props;

  return <>{isActive && <ActiveIcon />}</>;
});
