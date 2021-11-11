/**
 *
 * Users
 *
 */

import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ListUser } from 'app/pages/Users/screens';
import { UserManage } from 'app/pages/UserManage/Loadable';

interface Props {
  match: any;
}

export const Users = memo(({ match }: Props) => {
  return (
    <Switch>
      <Route exact path={match.url} component={ListUser} />
      <Route exact path={`${match.url}/detail/:id`} component={UserManage} />

      <Redirect exact to={match.url} />
    </Switch>
  );
});
