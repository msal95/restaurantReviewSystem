import {call, put} from 'redux-saga/effects';

import Api from '../Services/ApiCaller';
import RestaurantActions from '../Redux/RestaurantRedux';
import {Strings} from '../Themes/Strings';
import {showMessage} from '../Lib/utils';
import {MESSAGE_TYPES} from '../Lib/constants';
import AuthActions from '../Redux/AuthRedux'

export function* onFetchRestaurantsList(api) {
  try {
    const {response = []} = yield call(Api.callServer, api.restaurants, {});
    yield put(RestaurantActions.restaurantsListSuccess(response));
  } catch ({message}) {
    yield put(RestaurantActions.restaurantsListFailure(String(message)));
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
    yield put(RestaurantActions.createRestaurantSuccess(response));
    showMessage(Strings.createRestaurantSuccess, MESSAGE_TYPES.SUCCESS);
  } catch ({message}) {
    yield put(RestaurantActions.createRestaurantFailure(message));
    showMessage(Strings.createRestaurantFail, MESSAGE_TYPES.ERROR);
  }
}

export function* onCreateReview(api, {data = {}, restaurantId}) {
  try {
    const {response} = yield call(Api.callServer, api.createReview, {
      data,
      restaurantId,
    });
    yield put(RestaurantActions.createReviewSuccess(response));
    showMessage(Strings.createReviewSuccess, MESSAGE_TYPES.SUCCESS);
  } catch ({message}) {
    yield put(RestaurantActions.createReviewFailure(message));
    showMessage(Strings.createReviewFail, MESSAGE_TYPES.ERROR);
  }
}

export function* onDeleteRestaurant(api, {data = {}}) {
  try {
    const {response} = yield call(Api.callServer, api.deleteRestaurant, { _id: data?._id });
    yield put(RestaurantActions.deleteRestaurantSuccess(data?._id));
    showMessage(Strings.restaurantsDeleted, MESSAGE_TYPES.SUCCESS);
  } catch ({message}) {
    yield put(RestaurantActions.deleteRestaurantFailure(message));
    showMessage(message, MESSAGE_TYPES.ERROR);
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
    showMessage(Strings.replied, MESSAGE_TYPES.ERROR);
  }
}
