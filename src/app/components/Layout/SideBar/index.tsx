/**
 *
 * SideBar
 *
 */
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import styled from 'styled-components/macro';
import avatar from 'images/auth/avatar.png';
import { selectMe } from 'app/pages/Authorize/slice/selectors';
import { useSelector } from 'react-redux';
import { menuItems } from 'app/constants';
interface Props {
  collapsed?: boolean;
  ref?: any;
}

export const SideBar = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { collapsed } = props;
  const myElement = React.useRef<HTMLDivElement>(null);
  const getMe = useSelector(selectMe);
  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    if (myElement?.current) {
      if (collapsed) {
        myElement.current.style.width = '0';
      } else {
        myElement.current.style.width = '300px';
      }
    }
  }, [collapsed]);

  const handleClickMenu = menuItem => {
    history.push(menuItem);
  };

  return (
    <Div ref={myElement}>
      <WrapSideBar>
        <WrapProfile>
          <Avatar src={getMe.avatar ? getMe.avatar : avatar} />
          <span className="pl-3">{t('Admin')}</span>
        </WrapProfile>

        <WrapNav>
          <NavItem className="main-navigation"></NavItem>
          {menuItems.map(menu => (
            <WrapLink
              key={menu.link}
              className={path.includes(menu.to) ? 'active' : ''}
              onClick={() => handleClickMenu(menu.to)}
            >
              <CustomLink to={menu.to}>{menu.link}</CustomLink>
            </WrapLink>
          ))}
          {/* <WrapLink className="active">
            <CustomLink to="/user-codes">{t('사용자 코드 관리')}</CustomLink>
          </WrapLink>
          <WrapLink>
            <CustomLink to="/image-manage">{t('이미지 관리')}</CustomLink>
          </WrapLink> */}
          {/* <WrapLink>
            <CustomLink to="/banners">{t('배너')}</CustomLink>
          </WrapLink> */}
          {/* <WrapLink>
            <CustomLink to="/notification-system">
              {t('공지 사항 관리')}
            </CustomLink>
          </WrapLink>
          <WrapLink>
            <CustomLink to="/users">{t('사용자관리')}</CustomLink>
          </WrapLink>
          <WrapLink>
            <CustomLink to="/golden-ticket">{t('수상관리')}</CustomLink>
          </WrapLink>
          <WrapLink>
            <CustomLink to="/live-stream">{t('라이브 방송 관리')}</CustomLink>
          </WrapLink>
          <WrapLink>
            <CustomLink to="/report">{t('위반신고 관리')}</CustomLink>
          </WrapLink> */}
          {/* <WrapLink>
            <CustomLink to="/setting-system">{t('Setting System')}</CustomLink>
          </WrapLink> */}
          {/* <WrapLink>
            <CustomLink to="/setting-question">
              {t('Question/Answer')}
            </CustomLink>
          </WrapLink> */}
        </WrapNav>
      </WrapSideBar>
    </Div>
  );
});

const Div = styled.div`
  width: 300px;
  transition: 0.3s;
  overflow-x: hidden;
`;

const WrapSideBar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #222d32;
  color: #fff;
`;

const WrapNav = styled(Nav)`
  flex-direction: column;

  .main-navigation {
    color: #4b646f;
    background: #1a2226;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    font-size: 12px;
    height: 2rem;
  }

  .active {
    background: #405057;
  }
`;

const WrapLink = styled(NavItem)`
  padding: 10px 20px;

  :hover {
    background: #3e484d;
  }
`;

const CustomLink = styled(Link)`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  color: #b8c7ce;

  :hover {
    color: #fff;
    text-decoration: none;
  }
`;

const WrapProfile = styled.div`
  background-color: #222d32;
  padding: 20px 40px 20px 30px;

  span {
    color: #c2c6cd;
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
