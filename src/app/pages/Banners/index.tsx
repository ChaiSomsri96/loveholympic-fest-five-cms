/**
 *
 * Banners
 *
 */

import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DetailBanner, ListBanner } from 'app/pages/Banners/screens';

interface Props {
  match: any;
}

export const Banners = memo(({ match }: Props) => {
  return (
    <>
      <Switch>
        <Route exact path={match.url} component={ListBanner} />
        <Route exact path={`${match.url}/:id`} component={DetailBanner} />
        <Route exact path={`${match.url}/add`} component={DetailBanner} />

        <Redirect exact to={match.url} />
      </Switch>
    </>
  );
});
