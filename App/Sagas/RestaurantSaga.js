import { call, put } from 'redux-saga/effects'

import Api from '../Services/ApiCaller'
import RestaurantActions from '../Redux/RestaurantRedux'
import { Strings } from '../Themes/Strings'
import { printLogs } from '../Lib/utils'

export function * onFetchRestaurantsList (api) {
  try {
    const { response = [] } = yield call(Api.callServer, api.restaurants, {})
    yield put(RestaurantActions.restaurantsListSuccess(response))
  } catch ({ message }) {
    yield put(RestaurantActions.restaurantsListFailure(String(message)))
    console.log(message ?? Strings.badCredential)
  } finally {
  }
}

export function * onFetchRestaurantDetails (api, { data = {} }) {
  try {
    const { response = [] } = yield call(Api.callServer, api.restaurantDetails, data)
    yield put(RestaurantActions.restaurantDetailsSuccess(response))
  } catch ({ message }) {
    yield put(RestaurantActions.restaurantDetailsFailure(String(message)))
    console.log(message ?? Strings.badCredential)
  } finally {
  }
}

export function * onCreateRestaurant (api, { data = {} }) {
  try {
    const form_data = new FormData()

    for (const key in data) {
      form_data.append(key, data[key])
    }
    const { response } = yield call(Api.callServer, api.createRestaurantApi, form_data)
    printLogs({response})
  } catch ({ message }) {
    printLogs({message})
  } finally {
  }
}
