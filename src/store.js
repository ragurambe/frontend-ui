import { init } from '@rematch/core';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'connected-react-router';
import rematchLoadingPlugin from '@rematch/loading';

import models from '@Root/models';
import routerReducer from '@Root/routerReducer';

const middlewares = [];
export const history = createHistory();
const isProduction = process.env.NODE_ENV === 'production';

middlewares.push(routerMiddleware(history));

if (!isProduction) {
  middlewares.push(
    immutableStateInvariantMiddleware({
      ignore: ['loading'],
    }),
  );
}

const store = init({
  models,
  plugins: [rematchLoadingPlugin({})],
  redux: {
    reducers: {
      router: routerReducer(history),
    },
    devtoolOptions: {
      disabled: isProduction,
    },
    middlewares,
  },
});

export const { dispatch } = store;

export default store;
