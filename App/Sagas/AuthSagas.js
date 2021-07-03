import { call, put } from 'redux-saga/effects'

import Api from '../Services/ApiCaller'
import AuthActions from '../Redux/AuthRedux'
import { Strings } from '../Themes/Strings'
import { printLogs, showMessage } from '../Lib/utils'
import { MESSAGE_TYPES } from '../Lib/constants'
import { NavigationService } from '../Utils/NavigationService'
import RestaurantActions from '../Redux/RestaurantRedux'

export function * onAuthSuccess (api, { user = {} }) {
  try {
    if (user?.authToken) {
      api?.setHeader?.('Authorization', `Bearer ${user?.authToken}`)
    }
  } catch (message) {
    printLogs(message)
  } finally {
  }
}

export function * onSignup (api, { data = {} }) {
  try {
    const form_data = new FormData()

    for (const key in data) {
      form_data.append(key, data[key])
    }
    const { response } = yield call(Api.callServer, api.signup, form_data)
    if (response?.authToken) {
      yield put(AuthActions.authSuccess(response))
      yield put(AuthActions.signupSuccess(response))
      showMessage(Strings.accountCreatedSuccessful, MESSAGE_TYPES.SUCCESS)
    }
  } catch ({ message }) {
    yield put(AuthActions.signupFailure(message))
  }
}

export function * onEditProfile (api, { data = {} }) {
  try {
    const form_data = new FormData()
    for (const key in data) {
      form_data.append(key, data[key])
    }
    const { response } = yield call(Api.callServer, api.editProfile, form_data)
    yield put(AuthActions.editProfileSuccess(response))
    showMessage(Strings.profileUpdated, MESSAGE_TYPES.SUCCESS)
    NavigationService.goBack()
  } catch ({ message }) {
    yield put(AuthActions.editProfileFailure(message))
  }
}

export function * onEditOtherUser (api, { data = {} }) {
  try {
    const form_data = new FormData()
    for (const key in data) {
      form_data.append(key, data[key])
    }
    const { response } = yield call(Api.callServer, api.editOtherUser, {
      data: form_data,
      _id: data?._id,
    })
    yield put(RestaurantActions.updateUserInResAndReviews(response))
    yield put(AuthActions.editOtherUserSuccess(response, data?._id))
    showMessage(Strings.profileUpdated, MESSAGE_TYPES.SUCCESS)
    NavigationService.goBack()
  } catch ({ message }) {
    yield put(AuthActions.editOtherUserFailure(message))
  }
}

export function * onDeleteUser (api, { data = {} }) {
  try {
    const { response } = yield call(Api.callServer, api.deleteUser, {
      _id: data?._id,
    })
    yield put(AuthActions.deleteUserSuccess(data?._id))
    showMessage(Strings.userDeleted, MESSAGE_TYPES.SUCCESS)
  } catch ({ message }) {
    yield put(AuthActions.deleteUserFailure(message))
  }
}

export function * onLogin (api, { data = {} }) {
  try {
    const { response = {} } = yield call(Api.callServer, api.login, data)
    if (response?.authToken) {
      yield put(AuthActions.authSuccess(response))
      yield put(AuthActions.loginSuccess(response))
    }
  } catch ({ message }) {
    yield put(AuthActions.loginFailure(message))
  }
}

export function * onGetUserProfile (api, { data = {} }) {
  try {
    const { response = [] } = yield call(Api.callServer, api.userProfile, {
      data,
    })
    yield put(AuthActions.userProfileSuccess(response))
  } catch ({ message }) {
    yield put(AuthActions.userProfileFailure(String(message)))
  }
}

export function * onGetAllUsers (api, { data = {} }) {
  try {
    const { response = [] } = yield call(Api.callServer, api.allUsers, data)
    yield put(AuthActions.allUsersSuccess(response))
  } catch ({ message }) {
    yield put(AuthActions.allUsersFailure(String(message)))
  }
}

export function * onLogout (api, { params }) {
  onResetAuthHeader()
}

function * onResetAuthHeader (api) {
  try {
    yield api.deleteHeader('Authorization')
  } catch (e) {}
}
