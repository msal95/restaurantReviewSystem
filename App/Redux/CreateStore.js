import {createStore, applyMiddleware, compose} from 'redux';
import Config from '../Config/DebugConfig';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';
import ReduxPersist from '../Config/ReduxPersist';
import Rehydration from '../Services/Rehydration';

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron
    ? console.tron.createSagaMonitor()
    : null;
  const sagaMiddleware = createSagaMiddleware({sagaMonitor});
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = createStore;
  if (Config.useReactotron) {
    enhancers.push(Reactotron.createEnhancer());
  }
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  if (ReduxPersist.active) {
    Rehydration?.updateReducers?.(store);
  }
  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga);

  return {
    store,
    sagasManager,
    sagaMiddleware,
  };
};
