/**
 *
 * FesButton
 *
 */
import React, { memo } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components/macro';

interface Props {
  title: string;
  style?: object;
  type?: any;
  icon?: React.ReactNode;
  ref?: any;
  background?: string;
  color?: string;
  onClick?: any;
}

export const FesButton = memo((props: Props) => {
  const { title, icon, onClick, ...rest } = props;

  return (
    <CustomButton {...rest} onClick={onClick}>
      {icon ? icon : null} {title}
    </CustomButton>
  );
});

const CustomButton = styled(Button)`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;

  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  margin: 0 10px;

  background-color: ${props =>
    props.background ? props.background : '#2A4365'};
  color: ${props => props.color};

  :hover {
    background-color: ${props => (props.background ? '#7d858c' : '#6d84a3')};
  }
`;
