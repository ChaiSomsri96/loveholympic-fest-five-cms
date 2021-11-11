/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';
import { Authorize } from 'app/pages/Authorize/Loadable';
import MainRoute from 'app/route';
import _ from 'lodash';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from 'styles/global-styles';
import { Modal as GlobalModal } from 'app/pages/Modal/Loadable';

const FesRoute = ({ component: Component, path, isProtected, ...rest }) => {
  const fesAccessToken = localStorage.getItem('fesAccessToken');

  if (isProtected) {
    if (!_.startsWith(path, '/auth') && !fesAccessToken) {
      return <Redirect to="/auth" />;
    }
  }

  if (_.startsWith(path, '/auth') && fesAccessToken) {
    return <Redirect to="/" />;
  }

  return (
    <div className="fade show w-100">
      <Route {...rest} path={path} component={Component} />
    </div>
  );
};

export function App() {
  const { i18n } = useTranslation();
  return (
    <>
      <Helmet
        titleTemplate="%s - 러브 홀림픽"
        defaultTitle="러브 홀림픽"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A FestFive application" />
      </Helmet>

      <Switch>
        <FesRoute
          isProtected={false}
          path={process.env.PUBLIC_URL + '/auth'}
          component={Authorize}
        />

        <FesRoute
          isProtected
          path={process.env.PUBLIC_URL + '/'}
          component={MainRoute}
        />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
      <ToastContainer autoClose={2000} />
      <GlobalModal />
    </>
  );
}
