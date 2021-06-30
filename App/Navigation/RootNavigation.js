import * as React from 'react';
import {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import {Colors} from '../Themes';
import CreateRestaurantScreen from '../Screens/CreateRestaurantScreen';
import RestaurantDetailsScreen from '../Screens/RestaurantDetailsScreen';
import CommentsReplyScreen from '../Screens/CommentsReplyScreen';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../Screens/ProfileScreen';

const Stack = createStackNavigator();

const ScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.blue,
  },
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
};

function RootNavigation(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <SafeAreaView style={{flex: 1, backgroundColor: 'white'}} />;
  }

  if (!props?.user?.authToken) {
    return (
      <Stack.Navigator initialRouteName="Login" screenOptions={ScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Tabs" screenOptions={ScreenOptions}>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RestaurantDetails"
        component={RestaurantDetailsScreen}
      />
      <Stack.Screen
        name="CreateRestaurant"
        component={CreateRestaurantScreen}
      />
      <Stack.Screen name="Reply" component={CommentsReplyScreen} />
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  );
}

const mapStateToProps = ({auth: {user = {}} = {}}) => ({user});

export default connect(mapStateToProps, null)(RootNavigation);
