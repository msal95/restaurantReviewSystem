import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import { Colors } from '../Themes'
import CreateRestaurantScreen from '../screens/CreateRestaurantScreen'
import RestaurantDetailsScreen from '../screens/RestaurantDetailsScreen'
import CommentsReplyScreen from '../screens/CommentsReplyScreen'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'

const Stack = createStackNavigator()

const ScreenOptions =
  {
    headerStyle: {
      backgroundColor: Colors.blue
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerTitleAlign: 'center'
  }

function RootNavigation (props) {
  const [loading, setLoading] = useState(true)
  useEffect(() =>{
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  if(loading){
    return  <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}/>
  }

  if (!props?.user?.authToken) {
    return (<Stack.Navigator initialRouteName="Login" screenOptions={ScreenOptions}>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="SignUp" component={SignupScreen}/>
    </Stack.Navigator>)
  }

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={ScreenOptions}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen}/>
      <Stack.Screen name="CreateRestaurant" component={CreateRestaurantScreen}/>
      <Stack.Screen name="Reply" component={CommentsReplyScreen}/>
    </Stack.Navigator>
  )
}

const mapStateToProps = ({ auth: { user = {} } = {} }) => ({ user })

export default connect(mapStateToProps, null)(RootNavigation)
