import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  restaurantsList: ['data'],
  restaurantsListSuccess: ['response'],
  restaurantsListFailure: ['error'],

  restaurantDetails: ['data'],
  restaurantDetailsSuccess: ['response'],
  restaurantDetailsFailure: ['error'],

  createRestaurant: ['data'],
  createRestaurantSuccess: ['response'],
  createRestaurantFailure: ['error'],

})
export const RestTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  error: '',
  restaurantsList: [],
  restaurantDetails: {}
})

/* ------------- Reducers ------------- */

export const _restaurantsList = state => ({ ...state, loading: true })

export const _restaurantsListSuccess = (state, { response }) => ({
  ...state,
  restaurantsList: response || [],
  loading: false
})

export const _restaurantsListFailure = (state, { error = '' }) => ({ ...state, loading: false, error })

export const _restaurantDetails = state => ({ ...state })

export const _restaurantDetailsSuccess = (state, { response }) => ({
  ...state,
  restaurantDetails: response || {},
  loading: false
})

export const _restaurantDetailsFailure = (state, { error = '' }) => ({ ...state, loading: false, error })

export const _createRestaurant = state => ({ ...state, loading: true })
export const _createRestaurantSuccess = (state, { response }) => ({
  ...state,
  createRestaurant: response || {},
  loading: false
})

export const _createRestaurantFailure = (state, { error = '' }) => ({ ...state, loading: false, error })

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
})
