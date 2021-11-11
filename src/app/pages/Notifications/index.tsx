/**
 *
 * Notifications
 *
 */

import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  ListNotification,
  AddEditNotification,
} from 'app/pages/Notifications/screens';
interface Props {
  match: any;
}

export const Notifications = memo(({ match }: Props) => {
  return (
    <Switch>
      <Route exact path={match.url} component={ListNotification} />
      <Route exact path={`${match.url}/:id`} component={AddEditNotification} />
      <Route exact path={`${match.url}/add`} component={AddEditNotification} />

      <Redirect exact to={match.url} />
    </Switch>
  );
});
