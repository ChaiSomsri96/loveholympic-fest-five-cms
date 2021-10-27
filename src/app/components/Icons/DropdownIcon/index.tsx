/**
 *
 * DropdownIcon
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {}

export const DropdownIcon = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.50933 12.9923L0.276121 1.01605L16.7144 0.996785L8.50933 12.9923Z"
        fill="#FBFBFB"
      />
    </svg>
  );
});
