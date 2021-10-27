/**
 *
 * LogoutIcon
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

interface Props {}

export const LogoutIcon = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 1L1 13H10L9 21L19 9H10L11 1Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

const Div = styled.div``;
