import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  signup: ['data'],
  login: ['data'],
  logout: null,
  authSuccess: ['user']
})
export const AuthTypes = Types
export default Creators
/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  loading: false,
  user: {},
  error: ''
})
/* ------------- Reducers ------------- */
export const _logout = state => ({
  ...state,
  loading: false,
  error: '',
  user: {}
})
export const _signup = state => ({ ...state, loading: true })
export const _login = state => ({ ...state, loading: true })

export const _authSuccess = (state, { user }) => ({ ...state, loading: false, user })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP]: _signup,
  [Types.LOGIN]: _login,
  [Types.LOGOUT]: _logout,
  [Types.AUTH_SUCCESS]: _authSuccess
})
