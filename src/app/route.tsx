import { Header, SideBar } from 'app/components/Layout';
import { Banners } from 'app/pages/Banners/Loadable';
import { ProfileSetting } from 'app/pages/ProfileSetting/Loadable';
import { QuestionManage } from 'app/pages/QuestionManage/Loadable';
import { SettingSystem } from 'app/pages/SettingSystem/Loadable';
import { UserCodeManage } from 'app/pages/UserCodeManage/Loadable';
import { Users } from 'app/pages/Users/Loadable';
import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ErrManage } from 'app/pages/ErrManage/Loadable';
import { Notifications } from 'app/pages/Notifications/Loadable';
import { LiveStream } from 'app/pages/LiveStream/Loadable';
import { GoldenTicket } from 'app/pages/GoldenTicket/Loadable';
import { ImageManage } from 'app/pages/ImageManage/Loadable';
import { useAuthorizeSlice } from 'app/pages/Authorize/slice';
import { useDispatch } from 'react-redux';

export default function MainRoute() {
  const dispatch = useDispatch();
  const { actions } = useAuthorizeSlice();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  useEffect(() => {
    dispatch(actions.getProfile({}));
  }, [actions, dispatch]);

  return (
    <Container>
      <SideBar collapsed={collapsed} />
      <MainContent>
        <Header onCollapsed={onCollapsed} />
        <Switch>
          <Route exact path="/profile" component={ProfileSetting} />
          <Route path="/user-codes" component={UserCodeManage} />
          <Route path="/banners" component={Banners} />
          <Route path="/setting-system" component={SettingSystem} />
          <Route path="/notification-system" component={Notifications} />
          <Route path="/users" component={Users} />
          <Route path="/setting-question" component={QuestionManage} />
          <Route path="/report" component={ErrManage} />
          <Route path="/live-stream" component={LiveStream} />
          <Route path="/golden-ticket" component={GoldenTicket} />
          <Route path="/image-manage" component={ImageManage} />

          <Redirect to="/notification-system" />
        </Switch>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  min-height: 100%;
`;

const MainContent = styled.div`
  width: 100%;
  transition: margin-left 1s;
`;
