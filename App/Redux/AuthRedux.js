import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  signup: ['data'],
  signupSuccess: ['data'],
  signupFailure: ['data'],
  login: ['data'],
  logout: null,
  authSuccess: ['user'],

  userProfile: ['data'],
  userProfileSuccess: ['response'],
  userProfileFailure: ['error'],

  allUsers: ['data'],
  allUsersSuccess: ['response'],
  allUsersFailure: ['error'],
});
export const AuthTypes = Types;
export default Creators;
/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  loading: false,
  user: {},
  error: '',
  isFetchingUsers: false,
});
/* ------------- Reducers ------------- */
export const _logout = state => ({
  ...state,
  loading: false,
  error: '',
  user: {},
});
export const _signup = state => ({...state, loading: true});
export const _signupSuccess = state => ({...state});
export const _signupFailure = (state, {error = ''}) => ({...state, error});

export const _login = state => ({...state, loading: true});

export const _authSuccess = (state, {user}) => ({
  ...state,
  loading: false,
  user,
});

export const _userProfile = state => ({...state});
export const _userProfileSuccess = state => ({...state});
export const _userProfileFailure = (state, {error = ''}) => ({...state, error});

export const _allUsers = state => ({...state, isFetchingUsers: true});
export const _allUsersSuccess = (state, {response = []}) => ({
  ...state,
  allUsers: response,
  isFetchingUsers: false,
});
export const _allUsersFailure = (state, {error = ''}) => ({
  ...state,
  error,
  isFetchingUsers: false,
});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP]: _signup,
  [Types.SIGNUP_SUCCESS]: _signupSuccess,
  [Types.SIGNUP_FAILURE]: _signupFailure,
  [Types.LOGIN]: _login,
  [Types.LOGOUT]: _logout,
  [Types.AUTH_SUCCESS]: _authSuccess,
  [Types.USER_PROFILE]: _userProfile,
  [Types.USER_PROFILE_SUCCESS]: _userProfileSuccess,
  [Types.USER_PROFILE_FAILURE]: _userProfileFailure,
  [Types.ALL_USERS]: _allUsers,
  [Types.ALL_USERS_SUCCESS]: _allUsersSuccess,
  [Types.ALL_USERS_FAILURE]: _allUsersFailure,
});
