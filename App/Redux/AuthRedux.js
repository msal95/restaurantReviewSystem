import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {uniqBy} from 'lodash';

import {PAGINATION_DEFAULTS} from '../Lib/constants';

/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  signup: ['data'],
  signupSuccess: ['data'],
  signupFailure: ['data'],

  editProfile: ['data'],
  editProfileSuccess: ['user'],
  editProfileFailure: ['error'],

  deleteUser: ['data'],
  deleteUserSuccess: ['id'],
  deleteUserFailure: ['error'],

  editOtherUser: ['data'],
  editOtherUserSuccess: ['user', 'id'],
  editOtherUserFailure: ['error'],

  login: ['data'],
  loginSuccess: ['response'],
  loginFailure: ['error'],

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
  pageNo: PAGINATION_DEFAULTS.PAGE,
  pageSize: PAGINATION_DEFAULTS.PAGE_SIZE,
});

/* ------------- Reducers ------------- */
export const _logout = state => ({
  ...state,
  loading: false,
  error: '',
  user: {},
});

export const _signup = state => ({
  ...state,
  loading: true,
});
export const _signupSuccess = state => ({
  ...state,
  loading: false,
});
export const _signupFailure = (state, {error = ''}) => ({
  ...state,
  error,
  loading: false,
});

export const _login = state => ({...state, loading: true});
export const _loginSuccess = state => ({
  ...state,
  loading: false,
});
export const _loginFailure = state => ({
  ...state,
  loading: false,
  user: {},
});

export const _authSuccess = (state, {user}) => ({
  ...state,
  loading: false,
  user,
});

export const _userProfile = state => ({...state});
export const _userProfileSuccess = state => ({...state});
export const _userProfileFailure = (state, {error = ''}) => ({...state, error});

export const _allUsers = (state, {data}) => ({
  ...state,
  pageNo: data?.pageNo ?? PAGINATION_DEFAULTS.PAGE,
  pageSize: data?.pageSize ?? PAGINATION_DEFAULTS.PAGE_SIZE,
  loading: true,
});

export const _allUsersSuccess = (state, {response = []}) => {
  let {allUsers} = state;
  if (state?.pageNo === PAGINATION_DEFAULTS.PAGE) {
    allUsers = response ?? [];
  } else {
    allUsers = [...(allUsers ?? []), ...(response ?? [])];
  }

  return {
    ...state,
    allUsers: uniqBy(allUsers, '_id'),
    loading: false,
    isRemaining: Boolean(response?.length),
  };
};

export const _allUsersFailure = (state, {error = ''}) => ({
  ...state,
  error,
  loading: false,
  isRemaining: false,
});

export const _editProfile = state => ({...state, loading: true});

export const _editProfileSuccess = (state, {user = {}}) => ({
  ...state,
  user: {...(state?.user || {}), ...user},
  loading: false,
});

export const _editProfileFailure = (state, {error = ''}) => ({
  ...state,
  error,
  loading: false,
});

export const _editOtherUser = state => ({...state, loading: true});

export const _editOtherUserSuccess = (state, {user = {}, id}) => ({
  ...state,
  allUsers: (state.allUsers || []).map(item =>
    item?._id === id ? user : item,
  ),
  loading: false,
});

export const _editOtherUserFailure = (state, {error = ''}) => ({
  ...state,
  error,
  loading: false,
});

export const _deleteUser = state => ({...state, deletingUser: true});

export const _deleteUserSuccess = (state, {id}) => ({
  ...state,
  allUsers: (state.allUsers || []).filter(item => item?._id !== id),
  deletingUser: false,
});

export const _deleteUserFailure = (state, {error = ''}) => ({
  ...state,
  error,
  deletingUser: false,
});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP]: _signup,
  [Types.SIGNUP_SUCCESS]: _signupSuccess,
  [Types.SIGNUP_FAILURE]: _signupFailure,

  [Types.LOGIN]: _login,
  [Types.LOGIN_SUCCESS]: _loginSuccess,
  [Types.LOGIN_FAILURE]: _loginFailure,
  [Types.LOGOUT]: _logout,
  [Types.AUTH_SUCCESS]: _authSuccess,

  [Types.USER_PROFILE]: _userProfile,
  [Types.USER_PROFILE_SUCCESS]: _userProfileSuccess,
  [Types.USER_PROFILE_FAILURE]: _userProfileFailure,

  [Types.ALL_USERS]: _allUsers,
  [Types.ALL_USERS_SUCCESS]: _allUsersSuccess,
  [Types.ALL_USERS_FAILURE]: _allUsersFailure,

  [Types.EDIT_PROFILE]: _editProfile,
  [Types.EDIT_PROFILE_SUCCESS]: _editProfileSuccess,
  [Types.EDIT_PROFILE_FAILURE]: _editProfileFailure,

  [Types.EDIT_OTHER_USER]: _editOtherUser,
  [Types.EDIT_OTHER_USER_SUCCESS]: _editOtherUserSuccess,
  [Types.EDIT_OTHER_USER_FAILURE]: _editOtherUserFailure,

  [Types.DELETE_USER]: _deleteUser,
  [Types.DELETE_USER_SUCCESS]: _deleteUserSuccess,
  [Types.DELETE_USER_FAILURE]: _deleteUserFailure,
});
