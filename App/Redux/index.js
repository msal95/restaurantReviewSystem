import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import { persistReducer } from 'redux-persist'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  auth: require('./AuthRedux').reducer,
  restaurants: require('./RestaurantRedux').reducer,
})

export default () => {
  let finalReducers = reducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(
    finalReducers,
    rootSaga,
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas)
      })
    })
  }

  return store
};
