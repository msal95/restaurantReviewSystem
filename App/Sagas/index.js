import {all, takeLatest} from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */
import {StartupTypes} from '../Redux/StartupRedux'
import {AuthTypes} from '../Redux/AuthRedux'

/* ------------- Sagas ------------- */
import {startup} from './StartupSagas'
import {
  onAuthSuccess, onDeleteUser, onEditOtherUser, onEditProfile,
  onGetAllUsers,
  onGetUserProfile,
  onLogin,
  onLogout,
  onSignup
} from './AuthSagas'
import {
  onCreateRestaurant,
  onCreateReview, onDeleteRestaurant, onDeleteReview,
  onFetchRestaurantDetails,
  onFetchRestaurantsList,
  onGetAllReviews,
  onReviewReply,
  onUpdateRestaurant,
  onUpdateReview
} from './RestaurantSaga'
import {RestTypes} from '../Redux/RestaurantRedux'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
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
    takeLatest(RestTypes.DELETE_REVIEW, onDeleteReview, api),
    takeLatest(RestTypes.DELETE_RESTAURANT, onDeleteRestaurant, api),
    takeLatest(AuthTypes.AUTH_SUCCESS, onAuthSuccess, api),
    takeLatest(AuthTypes.USER_PROFILE, onGetUserProfile, api),
    takeLatest(AuthTypes.ALL_USERS, onGetAllUsers, api),
    takeLatest(RestTypes.UPDATE_RESTAURANT, onUpdateRestaurant, api),
    takeLatest(RestTypes.UPDATE_REVIEW, onUpdateReview, api),
    takeLatest(AuthTypes.EDIT_PROFILE, onEditProfile, api),
    takeLatest(AuthTypes.EDIT_OTHER_USER, onEditOtherUser, api),
    takeLatest(AuthTypes.DELETE_USER, onDeleteUser, api),
    takeLatest(RestTypes.DELETE_RESTAURANT, onDeleteRestaurant, api)

    // some sagas receive extra parameters in addition to an action
  ])
}
