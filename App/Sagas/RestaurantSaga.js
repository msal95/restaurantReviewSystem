import {call, put} from 'redux-saga/effects';

import Api from '../Services/ApiCaller';
import RestaurantActions from '../Redux/RestaurantRedux';
import {Strings} from '../Themes/Strings';
import {printLogs, showMessage} from '../Lib/utils';
import {MESSAGE_TYPES} from '../Lib/constants';

export function* onFetchRestaurantsList(api) {
  try {
    const {response = []} = yield call(Api.callServer, api.restaurants, {});
    yield put(RestaurantActions.restaurantsListSuccess(response));
  } catch ({message}) {
    yield put(RestaurantActions.restaurantsListFailure(String(message)));
  } finally {
  }
}

export function* onFetchRestaurantDetails(api, {data = {}}) {
  try {
    const {response = []} = yield call(
      Api.callServer,
      api.restaurantDetails,
      data,
    );
    yield put(RestaurantActions.restaurantDetailsSuccess(response));
  } catch ({message}) {
    yield put(RestaurantActions.restaurantDetailsFailure(String(message)));
  } finally {
  }
}

export function* onCreateRestaurant(api, {data = {}}) {
  try {
    const form_data = new FormData();

    for (const key in data) {
      form_data.append(key, data[key]);
    }
    const {response} = yield call(
      Api.callServer,
      api.createRestaurantApi,
      form_data,
    );
    //TODO SUCCESS
  } catch ({message}) {
    //TODO FAILURE
  } finally {
  }
}

export function* onCreateReview(api, {data = {}, restaurantId}) {
  try {
    const form_data = new FormData();

    for (const key in data) {
      form_data.append(key, data[key]);
    }
    const {response} = yield call(Api.callServer, api.createReview, {
      data,
      restaurantId,
    });
    printLogs({response});
  } catch ({message}) {
    printLogs({message});
  }
}

export function* onGetAllReviews(api, {data = {}}) {
  try {
    const {response = []} = yield call(Api.callServer, api.getAllReviews, {
      data,
    });
    yield put(RestaurantActions.getAllReviewsSuccess(response));
  } catch ({message}) {
    yield put(RestaurantActions.getAllReviewsFailure(String(message)));
  }
}

export function* onReviewReply(
  api,
  {data = {}, restaurantId = null, reviewId = null},
) {
  try {
    yield call(Api.callServer, api.replyReviews, {
      data,
      restaurantId,
      reviewId,
    });
    yield put(RestaurantActions.reviewReplySuccess());
    showMessage(Strings.replied, MESSAGE_TYPES.SUCCESS);
  } catch ({message}) {
    yield put(RestaurantActions.reviewReplyFailure(message));
  }
}
