import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import {PAGINATION_DEFAULTS} from '../Lib/constants';

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

  updateRestaurant: ['data', 'restaurantId'],
  updateRestaurantSuccess: ['restaurant', 'restaurantId'],
  updateRestaurantFailure: ['error'],

  updateReview: ['data', 'restaurantId', 'reviewId'],
  updateReviewSuccess: ['response'],
  updateReviewFailure: ['error'],

  deleteRestaurant: ['data'],
  deleteRestaurantSuccess: ['id'],
  deleteRestaurantFailure: ['error'],

  deleteReview: ['data'],
  deleteReviewSuccess: ['id'],
  deleteReviewFailure: ['error'],
});
export const RestTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  error: '',
  restaurantsList: [],
  restaurantDetails: {},
  replying: false,
  updatingRestaurant: false,
  updatingReview: false,
  isResRemaining: false,
  isRevRemaining: false,
  loading: false,
  revLoading: false,
  resPageNo: PAGINATION_DEFAULTS.PAGE,
  resPageSize: PAGINATION_DEFAULTS.PAGE_SIZE,
  revPageNo: PAGINATION_DEFAULTS.PAGE,
  revPageSize: PAGINATION_DEFAULTS.PAGE_SIZE,
});

/* ------------- Reducers ------------- */

export const _restaurantsList = (state, {data}) => ({
  ...state,
  resPageNo: data?.pageNo ?? PAGINATION_DEFAULTS.PAGE,
  resPageSize: data?.pageSize ?? PAGINATION_DEFAULTS.PAGE_SIZE,
  loading: true,
});

export const _restaurantsListSuccess = (state, {response}) => {
  let {restaurantsList} = state;
  if (state?.resPageNo === PAGINATION_DEFAULTS.PAGE) {
    restaurantsList = response ?? [];
  } else {
    restaurantsList = [...(restaurantsList ?? []), ...(response ?? [])];
  }

  return {
    ...state,
    restaurantsList,
    isResRemaining: Boolean(response?.length),
    loading: false,
  };
};

export const _restaurantsListFailure = (state, {error = ''}) => ({
  ...state,
  loading: false,
  isResRemaining: false,
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

export const _createReview = state => ({
  ...state,
  loading: true,
});
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

export const _deleteRestaurant = state => ({
  ...state,
  deletingRestaurant: true,
});

export const _deleteRestaurantSuccess = (state, {id}) => ({
  ...state,
  restaurantsList: (state.restaurantsList || []).filter(
    item => item?._id !== id,
  ),
  deletingRestaurant: false,
});

export const _deleteRestaurantFailure = (state, {error = ''}) => ({
  ...state,
  error,
  deletingRestaurant: false,
});

export const _deleteReview = state => ({...state, deletingReview: true});

export const _deleteReviewSuccess = (state, {id}) => ({
  ...state,
  allReviews: (state.allReviews || []).filter(item => item?._id !== id),
  deletingReview: false,
});

export const _deleteReviewFailure = (state, {error = ''}) => ({
  ...state,
  error,
  deletingReview: false,
});

export const _getAllReviews = (state, {data}) => ({
  ...state,
  revPageNo: data?.pageNo ?? PAGINATION_DEFAULTS.PAGE,
  revPageSize: data?.pageSize ?? PAGINATION_DEFAULTS.PAGE_SIZE,
  revLoading: true,
});

export const _getAllReviewsSuccess = (state, {response}) => {
  let {allReviews} = state;
  if (state?.revPageNo === PAGINATION_DEFAULTS.PAGE) {
    allReviews = response ?? [];
  } else {
    allReviews = [...(allReviews ?? []), ...(response ?? [])];
  }

  return {
    ...state,
    allReviews,
    revLoading: Boolean(response?.length),
    loading: false,
  };
};

export const _getAllReviewsFailure = (state, {error = ''}) => ({
  ...state,
  revLoading: false,
  error,
  isRevRemaining: false,
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

export const _updateRestaurant = state => ({
  ...state,
  loading: true,
  updatingRestaurant: true,
});
export const _updateRestaurantSuccess = (
  state,
  {restaurant = {}, restaurantId},
) => ({
  ...state,
  updatingRestaurant: false,
  restaurantsList: (state.restaurantsList || []).map(item =>
    item?._id === restaurantId ? restaurant : item,
  ),
  loading: false,
});

export const _updateReview = state => ({
  ...state,
  updatingReview: true,
  loading: true,
});
export const _updateReviewSuccess = state => ({
  ...state,
  loading: false,
  updatingReview: false,
});
export const _updateReviewFailure = (state, {error = ''}) => ({
  ...state,
  updatingReview: false,
  loading: false,
  error,
});

export const _updateRestaurantFailure = (state, {error = ''}) => ({
  ...state,
  loading: false,
  updatingRestaurant: false,
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

  [Types.UPDATE_RESTAURANT]: _updateRestaurant,
  [Types.UPDATE_RESTAURANT_SUCCESS]: _updateRestaurantSuccess,
  [Types.UPDATE_RESTAURANT_FAILURE]: _updateRestaurantFailure,
  [Types.UPDATE_RESTAURANT]: _updateReview,
  [Types.UPDATE_RESTAURANT_SUCCESS]: _updateReviewSuccess,
  [Types.UPDATE_RESTAURANT_FAILURE]: _updateReviewFailure,

  [Types.DELETE_RESTAURANT]: _deleteRestaurant,
  [Types.DELETE_RESTAURANT_SUCCESS]: _deleteRestaurantSuccess,
  [Types.DELETE_RESTAURANT_FAILURE]: _deleteRestaurantFailure,

  [Types.DELETE_REVIEW]: _deleteReview,
  [Types.DELETE_REVIEW_SUCCESS]: _deleteReviewSuccess,
  [Types.DELETE_REVIEW_FAILURE]: _deleteReviewFailure,
});
