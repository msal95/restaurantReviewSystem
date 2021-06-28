import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  restaurantsList: ['data'],
  restaurantsListSuccess: ['response'],
  restaurantsListFailure: ['error'],

  restaurantDetails: ['data'],
  restaurantDetailsSuccess: ['response'],
  restaurantDetailsFailure: ['error'],

  createRestaurant: ['data'],
  createRestaurantSuccess: ['response'],
  createRestaurantFailure: ['error'],

  createReview: ['data', 'restaurantId'],
  createReviewSuccess: ['response'],
  createReviewFailure: ['error'],

  getAllReviews: ['data'],
  getAllReviewsSuccess: ['response'],
  getAllReviewsFailure: ['error'],

  reviewReply: ['data', 'restaurantId', 'reviewId'],
  reviewReplySuccess: null,
  reviewReplyFailure: ['error'],
});
export const RestTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  error: '',
  restaurantsList: [],
  restaurantDetails: {},
  replying: false,
});

/* ------------- Reducers ------------- */

export const _restaurantsList = state => ({...state, loading: true});
export const _restaurantsListSuccess = (state, {response}) => ({
  ...state,
  restaurantsList: response || [],
  loading: false,
});
export const _restaurantsListFailure = (state, {error = ''}) => ({
  ...state,
  loading: false,
  error,
});

export const _restaurantDetails = state => ({...state});
export const _restaurantDetailsSuccess = (state, {response}) => ({
  ...state,
  restaurantDetails: response || {},
  loading: false,
});
export const _restaurantDetailsFailure = (state, {error = ''}) => ({
  ...state,
  loading: false,
  error,
});

export const _createRestaurant = state => ({...state, loading: true});
export const _createRestaurantSuccess = (state, {response}) => ({
  ...state,
  createRestaurant: response || {},
  loading: false,
});
export const _createRestaurantFailure = (state, {error = ''}) => ({
  ...state,
  loading: false,
  error,
});

export const _createReview = state => ({...state, loading: true});
export const _createReviewSuccess = (state, {response}) => ({
  ...state,
  createReview: response || {},
  loading: false,
});
export const _createReviewFailure = (state, {error = ''}) => ({
  ...state,
  loading: false,
  error,
});

export const _getAllReviews = state => ({...state, loading: true});
export const _getAllReviewsSuccess = (state, {response}) => ({
  ...state,
  allReviews: response || [],
  loading: false,
});
export const _getAllReviewsFailure = (state, {error = ''}) => ({
  ...state,
  loading: false,
  error,
});

export const _reviewReply = state => ({...state, replying: true});
export const _reviewReplySuccess = state => ({
  ...state,
  replying: false,
});
export const _reviewReplyFailure = (state, {error = ''}) => ({
  ...state,
  replying: false,
  error,
});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESTAURANTS_LIST]: _restaurantsList,
  [Types.RESTAURANTS_LIST_SUCCESS]: _restaurantsListSuccess,
  [Types.RESTAURANTS_LIST_FAILURE]: _restaurantsListFailure,
  [Types.RESTAURANT_DETAILS]: _restaurantDetails,
  [Types.RESTAURANT_DETAILS_FAILURE]: _restaurantDetailsFailure,
  [Types.RESTAURANT_DETAILS_SUCCESS]: _restaurantDetailsSuccess,
  [Types.CREATE_RESTAURANT]: _createRestaurant,
  [Types.CREATE_RESTAURANT_SUCCESS]: _createRestaurantSuccess,
  [Types.CREATE_RESTAURANT_FAILURE]: _createRestaurantFailure,
  [Types.CREATE_REVIEW]: _createReview,
  [Types.CREATE_REVIEW_SUCCESS]: _createReviewSuccess,
  [Types.CREATE_REVIEW_FAILURE]: _createReviewFailure,
  [Types.GET_ALL_REVIEWS]: _getAllReviews,
  [Types.GET_ALL_REVIEWS_SUCCESS]: _getAllReviewsSuccess,
  [Types.GET_ALL_REVIEWS_FAILURE]: _getAllReviewsFailure,
  [Types.REVIEW_REPLY]: _reviewReply,
  [Types.REVIEW_REPLY_SUCCESS]: _reviewReplySuccess,
  [Types.REVIEW_REPLY_FAILURE]: _reviewReplyFailure,
});
