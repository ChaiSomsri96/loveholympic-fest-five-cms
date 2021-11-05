import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';

import createSagaMiddleware from 'redux-saga';
import browserHistory from 'utils/history';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';

import { createReducer } from './reducers';

function configure(history: History) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    // serializableMiddleware,
  ];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      ...middlewares,
    ],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
  });

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return store;
}

export const configureAppStore = () => configure(browserHistory);
