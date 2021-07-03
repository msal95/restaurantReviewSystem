import { call, put } from 'redux-saga/effects'

import { checkConnected } from '../Lib/NetworkUtils'
import { showMessage } from '../Lib/utils'
import { MESSAGE_TYPES } from '../Lib/constants'
import AuthActions from '../Redux/AuthRedux'

function * callServer (apiFunction, reqData = {}, showError = true, id = null) {
  try {
    const isConnected = yield checkConnected()
    if (isConnected) {
      const response = yield call(apiFunction, reqData, reqData.id || id)
      const {
        data: resData = {},
        status,
        ok = true,
        errMsg = '',
        problem,
      } = response
      if (status && status >= 200 && status <= 300 && ok) {
        return { error: false, response: resData, statusCode: status }
      }
      let message = ''
      if (errMsg) {
        message = errMsg
      } else if (resData) {
        if (typeof resData.error === 'object' && resData.error.message) {
          message = resData.error.message
        } else if (resData.message) {
          message = resData.message
        } else if (resData.msg) {
          message = resData.msg
        } else if (typeof resData === 'string') {
          message = resData
        } else {
          message = getMessage(resData)
        }
      } else {
        message = getMessage(problem)
      }
      if (showError) {
        showMessage(message, MESSAGE_TYPES.ERROR)
      }
      if (status === 401) {
        showMessage('Your session expired. Kindly login again.', MESSAGE_TYPES.ERROR)
        yield put(AuthActions.logout())
      }
      throw {
        error: true,
        message,
        statusCode: status,
        data: resData,
      }
    } else {
      const message = 'No internet connection.'
      if (showError) {
        showMessage(message, MESSAGE_TYPES.ERROR)
      }
      throw { error: true, message, statusCode: 503 }
    }
  } catch (e) {
    // logToConsole('apiCallerError: ', e)
    throw e
  }
}

const getMessage = error => {
  if (error === 'TIMEOUT_ERROR') {
    return 'No Response From Server.'
  }
  if (error === 'CONNECTION_ERROR') {
    return 'Server Is Not Available.'
  }
  if (error === 'NETWORK_ERROR') {
    return 'No Internet connection.'
  }
  return null
}
export default {
  callServer,
}
