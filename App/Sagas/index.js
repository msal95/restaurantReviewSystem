import {all, takeLatest} from 'redux-saga/effects';
import API from '../Services/Api';

/* ------------- Types ------------- */
import {StartupTypes} from '../Redux/StartupRedux';
import {AuthTypes} from '../Redux/AuthRedux';

/* ------------- Sagas ------------- */
import {startup} from './StartupSagas';
import {onAuthSuccess, onLogin, onSignup, onLogout} from './AuthSagas';
import {
  onCreateRestaurant,
  onCreateReview,
  onFetchRestaurantDetails,
  onFetchRestaurantsList,
  onGetAllReviews,
  onReviewReply,
} from './RestaurantSaga';
import {RestTypes} from '../Redux/RestaurantRedux';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(AuthTypes.SIGNUP, onSignup, api),
    takeLatest(AuthTypes.LOGIN, onLogin, api),
    takeLatest(AuthTypes.LOGOUT, onLogout, api),
    takeLatest(RestTypes.RESTAURANTS_LIST, onFetchRestaurantsList, api),
    takeLatest(RestTypes.RESTAURANT_DETAILS, onFetchRestaurantDetails, api),
    takeLatest(RestTypes.CREATE_RESTAURANT, onCreateRestaurant, api),
    takeLatest(RestTypes.CREATE_REVIEW, onCreateReview, api),
    takeLatest(RestTypes.GET_ALL_REVIEWS, onGetAllReviews, api),
    takeLatest(RestTypes.REVIEW_REPLY, onReviewReply, api),
    takeLatest(AuthTypes.AUTH_SUCCESS, onAuthSuccess, api),

    // some sagas receive extra parameters in addition to an action
  ]);
}
