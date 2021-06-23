
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import { Colors } from '../Themes'
import CreateRestaurantScreen from '../screens/CreateRestaurantScreen'
import RestaurantDetailsScreen from '../screens/RestaurantDetailsScreen'
import CommentsReplyScreen from '../screens/CommentsReplyScreen'

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
      <Stack.Screen name='CreateRestaurant' component={CreateRestaurantScreen} />
      <Stack.Screen name='RestaurantDetails' component={RestaurantDetailsScreen} />
      <Stack.Screen name='Reply' component={CommentsReplyScreen} />
    </Stack.Navigator>
  )
}

export default RootNavigation
