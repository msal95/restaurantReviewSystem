import { all, takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */
import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/AuthRedux'

/* ------------- Sagas ------------- */
import { startup } from './StartupSagas'
import { onAuthSuccess, onLogin, onSignup } from './AuthSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(LoginTypes.SIGNUP, onSignup, api),
    takeLatest(LoginTypes.LOGIN, onLogin, api),
    takeLatest(LoginTypes.AUTH_SUCCESS, onAuthSuccess, api)

    // some sagas receive extra parameters in addition to an action
  ])
}
