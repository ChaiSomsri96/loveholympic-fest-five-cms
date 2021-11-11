/**
 *
 * GoldenTicket
 *
 */
import { Setting, AddEditTicket } from 'app/pages/GoldenTicket/screens';
import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';

interface Props {
  match: any;
}

export const GoldenTicket = memo(({ match }: Props) => {
  return (
    <Switch>
      <Route exact path={match.url} component={Setting} />
      <Route exact path={`${match.url}/add`} component={AddEditTicket} />
    </Switch>
  );
});
