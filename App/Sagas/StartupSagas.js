import { delay, put, select } from 'redux-saga/effects'
import AuthAction from '../Redux/AuthRedux'

export function * startup (action) {
  yield delay(300)
  const { user } = yield select(state => state?.auth) ?? {}
  if (user?.authToken) {
    yield put(AuthAction.authSuccess(user))
  }
}
