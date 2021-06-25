import {call, put, delay} from 'redux-saga/effects'

import Api from '../Services/ApiCaller'
import AuthActions from '../Redux/AuthRedux'
import { Strings } from '../Themes/Strings'
import { printLogs } from '../Lib/utils'

export function* onAuthSuccess(api, {user = {}}) {
  try {
    if (user?.authToken) {
      api?.setHeader?.('Authorization', `Bearer ${user?.authToken}`);
    }
  } catch (message) {
    printLogs(message);
  } finally {
  }
}

export function * onSignup (api, {data = {}}) {
  try {
    const form_data = new FormData();

    for ( const key in data ) {
      form_data.append(key, data[key]);
    }
    const {response} = yield call(Api.callServer, api.signup, form_data)
    if(response?.authToken){
      yield put(AuthActions.authSuccess(response))
    }
  } catch ({message}) {
  } finally {
  }
}

export function* onLogin(api, {data = {}}) {
  try {
    const {response = {}} = yield call(Api.callServer, api.login, data);
    if(response?.authToken){
     yield put(AuthActions.authSuccess(response))
    }
  } catch ({message}) {
    console.log(message ?? Strings.badCredential);
  } finally {
  }
}

export function* onLogout(api, {params}) {
  onResetAuthHeader();
}
function* onResetAuthHeader(api) {
  try {
    yield api.deleteHeader('Authorization');
  } catch (e) {}
}
