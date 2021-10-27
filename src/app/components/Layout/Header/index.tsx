/**
 *
 * Header
 *
 */
import { ToggleMenuIcon } from 'app/components/Icons';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarToggler } from 'reactstrap';
import styled from 'styled-components/macro';
import { Profile } from 'app/components/Layout/Profile/Loadable';

interface Props {
  onCollapsed?: any;
}

export const Header = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { onCollapsed } = props;

  return (
    <>
      <Div>
        <NavbarToggler onClick={onCollapsed}>
          <ToggleMenuIcon />
        </NavbarToggler>
        <Profile />
      </Div>
    </>
  );
});

const Div = styled.div`
  width: 100%;
  background-color: #3c8dbc;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 5%;

  button:hover {
    background-color: #367fa9;
  }
`;
