import React from 'react';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigateTo(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function navigateBack() {
  navigationRef.current.goBack();
}

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function dispatch(params) {
  navigationRef.current?.dispatch(params);
}

export function goBack(params) {
  navigationRef.current?.goBack(params);
}

export function toggleDrawer(params) {}

export function getCurrentRouteName() {
  return navigationRef?.current?.getCurrentRoute?.()?.name;
}

export const resetAndNavigate = (screenName, index = 0) => {
  NavigationService.dispatch(
    CommonActions.reset({
      index,
      routes: [{name: screenName}],
    }),
  );
};

export const NavigationService = {
  goBack,
  navigate,
  dispatch,
  toggleDrawer,
  resetAndNavigate,
  navigateOnAuthBasic: resetAndNavigate,
};
