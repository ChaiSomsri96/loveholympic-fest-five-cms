/**
 *
 * PenToolIcon
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

interface Props {}

export const PenToolIcon = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 15.8333L15.8333 10L18.3333 12.5L12.5 18.3333L10 15.8333Z"
        stroke="#FFFCFE"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 10.8333L13.75 4.58332L1.66663 1.66666L4.58329 13.75L10.8333 15L15 10.8333Z"
        stroke="#FFFCFE"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66663 1.66666L7.98829 7.98832"
        stroke="#FFFCFE"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16667 10.8333C10.0871 10.8333 10.8333 10.0871 10.8333 9.16667C10.8333 8.24619 10.0871 7.5 9.16667 7.5C8.24619 7.5 7.5 8.24619 7.5 9.16667C7.5 10.0871 8.24619 10.8333 9.16667 10.8333Z"
        stroke="#FFFCFE"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

const Div = styled.div``;
