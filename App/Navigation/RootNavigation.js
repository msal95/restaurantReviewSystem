// In App.js in a new project

import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import { Colors } from '../Themes'

const Stack = createStackNavigator()

function RootNavigation () {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{
      headerStyle: {
        backgroundColor: Colors.blue,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerTitleAlign: 'center'
    }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='SignUp' component={SignupScreen} />
    </Stack.Navigator>
  )
}

export default RootNavigation
