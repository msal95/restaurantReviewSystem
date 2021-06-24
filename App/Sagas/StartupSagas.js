import { delay, select } from 'redux-saga/effects'
import { printLogs } from '../Lib/utils'

// exported to make available for tests

// process STARTUP actions
export function * startup (action) {
  yield delay(500)
  const {user} = yield select(state => state?.auth) ?? {};
  printLogs(user)

}
