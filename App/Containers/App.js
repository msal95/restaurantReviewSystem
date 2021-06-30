import '../Config'
import DebugConfig from '../Config/DebugConfig'
import type { Node } from 'react'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'

import RootContainer from './RootContainer'
import createStore from '../Redux'
import { NavigationContainer } from '@react-navigation/native'
import { printLogs } from '../Lib/utils'
import { navigationRef } from '../Utils/NavigationService'

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

  const routeNameRef = useRef(null)

  const onStateChange = async () => {
    if (__DEV__) {
      const previousRouteName = routeNameRef.current
      const { name, params } = navigationRef.current.getCurrentRoute?.() || {}

      if (previousRouteName !== name) {
        printLogs({
          NAVIGATION: {
            PREVIOUS_SCREEN: previousRouteName,
            CURRENT_SCREEN: name,
            PARAMS: params,
          }
        })
      }
      routeNameRef.current = name
    }
  }

  const onReady = () => (__DEV__ ? (routeNameRef.current = navigationRef.current.getCurrentRoute?.()?.name) : {})

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef} onStateChange={onStateChange} onReady={onReady}>
        <RootContainer/>
      </NavigationContainer>
    </Provider>
  )
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App
