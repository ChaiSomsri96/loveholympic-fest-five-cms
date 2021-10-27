/**
 *
 * ToggleMenuIcon
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

interface Props {
  onClick?: any;
}

export const ToggleMenuIcon = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#fff"
      className="bi bi-list"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  );
});

const Div = styled.div``;
