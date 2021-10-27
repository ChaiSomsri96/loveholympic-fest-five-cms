/**
 *
 * FesInput
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Input } from 'reactstrap';
interface Props {
  children?: any;
  className?: any;
  type?: string;
  placeholder?: string;
  value?: any;
  onChange?: any;
  name?: string;
}

export const FesInput = memo((props: Props) => {
  return <CustomInput {...props} />;
});

const CustomInput = styled(Input)`
  border-radius: 0;
  padding: 6px 12px;
  font-size: 15px;

  :focus {
    border-color: #3c8dbc;
    box-shadow: none;
  }
`;
