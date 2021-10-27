/**
 *
 * FesTypography
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

interface Props {
  title?: string;
}

export const FesTypography = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { title } = props;

  return <Typography>{t(`${title}`)}</Typography>;
});

const Typography = styled.span`
  font-family: Roboto;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  margin-bottom: 5px;

  color: #657d9d;
`;
