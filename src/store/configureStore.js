import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import routes from '../routes';
import { reduxReactRouter } from 'react-router-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import createLogger from 'redux-logger';
import { syncHistory } from 'react-router-redux'

export default function configureStore(history, initialState) {
  const routingMiddleware = syncHistory(history)

  const logger = createLogger();

  const middleware = applyMiddleware(routingMiddleware, thunk, logger);

  // Note: passing middleware as the last argument requires redux@>=3.1.0
  const store = createStore(
    rootReducer,
    initialState,
    middleware
  )

  routingMiddleware.listenForReplays(store)

  if (module.hot) {
    module.hot
    .accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;

}
