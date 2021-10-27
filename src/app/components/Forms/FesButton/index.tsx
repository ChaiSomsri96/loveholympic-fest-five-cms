/**
 *
 * FesButton
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'reactstrap';
import styled from 'styled-components/macro';

interface Props {
  color?: string;
  title?: string;
  type?: any;
}

interface Props {}

export const FesButton = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { color, title, type } = props;

  return (
    <Div>
      <CustomButton color={color} type={type}>
        {t(`${title}`)}
      </CustomButton>
    </Div>
  );
});

const Div = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
`;

const CustomButton = styled(Button)`
  width: 100%;
  background-color: white;
  color: #2148c0;
  border-color: none;
`;
