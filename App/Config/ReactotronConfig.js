import {NativeModules} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux as reduxPlugin} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import Config from './DebugConfig';
import ReactotronFlipper from 'reactotron-react-native/dist/flipper';

if (Config.useReactotron) {
  const {scriptURL} = NativeModules.SourceCode;
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];
  Reactotron.configure({
    name: 'Review Restaurants',
    host: scriptHostname,
    createSocket: path => new ReactotronFlipper(path),
  })
    .useReactNative()
    .use(
      reduxPlugin({
        onRestore: ({nav, state}) => ({...Immutable(state), nav}),
      }),
    )
    .use(sagaPlugin())
    .setAsyncStorageHandler(AsyncStorage) //
    .connect();
  // Let's clear Reactotron on every time we load the app
  Reactotron.clear();
  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron;
} else {
  // ADDED AN ELSE
  console.tron = console.log;
  console.tron.warn = console.warn;
  console.tron.error = console.error;
}
