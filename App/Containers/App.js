import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React from 'react'
import { Provider } from 'react-redux'
import type {Node} from 'react';

import RootContainer from './RootContainer'
import createStore from '../Redux'
import { NavigationContainer } from '@react-navigation/native'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

const App = (): Node => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootContainer />
      </NavigationContainer>
    </Provider>
  )
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
