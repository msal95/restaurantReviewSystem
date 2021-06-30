import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UsersScreen from '../screens/UsersScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../Themes';
import {shallowEqual, useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

function TabNavigator(props) {
  const {role = ''} = useSelector(
    ({auth: {user: {role = ''}} = {}}) => ({role}),
    shallowEqual,
  );
  const renderAdminScreen = useMemo(() => {
    if (role === 'ADMIN') {
      return <Tab.Screen name="Users" component={UsersScreen} />;
    }
    return null;
  }, [role]);

  const renderTabIcon = ({focused, color, size, route}) => {
    let iconName;
    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'user' : 'user';
    } else if (route.name === 'Users') {
      iconName = focused ? 'users' : 'users';
    }
    return <FontAwesome name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: props => renderTabIcon({...props, route}),
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.black,
        headerStyle: {
          backgroundColor: Colors.blue,
        },
        headerTintColor: Colors.white,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      {renderAdminScreen}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
