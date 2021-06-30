import {call, put} from 'redux-saga/effects';

import Api from '../Services/ApiCaller';
import AuthActions from '../Redux/AuthRedux';
import {Strings} from '../Themes/Strings';
import {printLogs, showMessage} from '../Lib/utils';
import {MESSAGE_TYPES} from '../Lib/constants';

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

export function* onSignup(api, {data = {}}) {
  try {
    const form_data = new FormData();

    for (const key in data) {
      form_data.append(key, data[key]);
    }
    const {response} = yield call(Api.callServer, api.signup, form_data);
    if (response?.authToken) {
      yield put(AuthActions.signupSuccess(response));
      showMessage(Strings.replied, MESSAGE_TYPES.SUCCESS);
    }
  } catch ({message}) {
    yield put(AuthActions.signupFailure(message));
    showMessage(Strings.replied, MESSAGE_TYPES.SUCCESS);
  }
}

export function* onLogin(api, {data = {}}) {
  try {
    const {response = {}} = yield call(Api.callServer, api.login, data);
    if (response?.authToken) {
      yield put(AuthActions.authSuccess(response));
    }
  } catch ({message}) {
    console.log(message ?? Strings.badCredential);
  } finally {
  }
}

export function* onGetUserProfile(api, {data = {}}) {
  try {
    const {response = []} = yield call(Api.callServer, api.userProfile, {
      data,
    });
    yield put(AuthActions.userProfileSuccess(response));
  } catch ({message}) {
    yield put(AuthActions.userProfileFailure(String(message)));
  }
}
export function* onGetAllUsers(api, {data = {}}) {
  try {
    const {response = []} = yield call(Api.callServer, api.allUsers, {
      data,
    });
    yield put(AuthActions.allUsersSuccess(response));
  } catch ({message}) {
    yield put(AuthActions.allUsersFailure(String(message)));
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
