/**
 *
 * Profile
 *
 */
import { LockIcon, SettingIcon } from 'app/components/Icons';
import avatar from 'images/auth/avatar.png';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import styled from 'styled-components/macro';
import { selectMe } from 'app/pages/Authorize/slice/selectors';
import { useSelector } from 'react-redux';

interface Props {}

export const Profile = memo((props: Props) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const getMe = useSelector(selectMe);

  const toggle = useCallback(
    () => setDropdownOpen(prevState => !prevState),
    [],
  );

  const onLogout = useCallback(() => {
    localStorage.removeItem('fesAccessToken');
    history.push('/auth');
  }, [history]);

  return (
    <Div>
      <Dropdown toggle={toggle} isOpen={dropdownOpen}>
        <DropdownToggle color={'#367fa9'}>
          <Avatar src={getMe.avatar ? getMe.avatar : avatar} />
          <span className="pl-3 admin">{t('Admin')}</span>
        </DropdownToggle>
        <DropdownMenu>
          <DropItem>계정</DropItem>
          <Link to="/profile">
            <SettingIcon />
            <span className="pl-2">프로필 설정</span>
          </Link>
          <Link to="#" onClick={onLogout}>
            <LockIcon />
            <span className="pl-2">로그아웃</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </Div>
  );
});

const Div = styled.div`
  float: right;

  .dropdown-menu {
    padding: 0;
  }

  .admin {
    color: #c2c6cd;
  }

  a {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1.25rem;
    clear: both;
    font-weight: 400;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    color: #4f5d73;
    text-decoration: none;

    :hover {
      background-color: #ebedef;
    }
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 25px;
  width: 25px;
`;

const DropItem = styled.div`
  display: block;
  padding: 0.5rem 1.25rem;
  margin-bottom: 0;
  font-size: 14px;
  text-align: center;
  color: #8a93a2;
  background-color: #ebedef !important;
`;
