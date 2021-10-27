/**
 *
 * FesInput
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Label } from 'reactstrap';
import styled from 'styled-components/macro';
interface Props {
  label?: string;
  id?: string;
  name?: string;
  type?: any;
  value?: any;
  // style?: object | {};
  onChange?: any;
}

export const FesInput = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { label, name, id, type, value, onChange, ...rest } = props;
  return (
    <Div>
      {label && <Label>{t(`${label}`)}</Label>}
      <CustomInput
        id={id}
        name={name}
        placeholder={name}
        type={type || 'text'}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </Div>
  );
});

const Div = styled.div``;

const CustomInput = styled(Input)`
  background-color: #455167;
  color: #fff;
  padding-left: 2.5rem;
  &.input {
    background-color: #455167 !important;
  }
  &.form-control:focus {
    background-color: #455167 !important;
    color: #fff;
  }
  ::-webkit-input-placeholder {
    color: #fff;
    text-transform: uppercase;
    font-weight: 50;
    font-size: 14px;
    opacity: 50%;
  }
`;
