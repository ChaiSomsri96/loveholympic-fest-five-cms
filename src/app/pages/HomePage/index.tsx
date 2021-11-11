import { useHomePageSlice } from 'app/pages/HomePage/slice';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { selectUser } from 'app/pages/HomePage/slice/selectors';
import { useSelector } from 'react-redux';

export function HomePage() {
  const { actions } = useHomePageSlice();
  const userInfo = useSelector(selectUser);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <div>
        <h1>HomePage Page</h1>
      </div>
    </>
  );
}
