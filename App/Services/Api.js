// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://192.168.1.22:8083/api/v1/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const signup = data => api.post('users', data)
  const login = data => api.post('users/login', data)
  const restaurants = data => api.get('restaurants', data)
  const createRestaurantApi = data => api.post('restaurants', data)
  const deleteRestaurant = data => api.delete(`restaurants/${data?._id}`, data)
  const deleteReview = ({restaurantId, reviewId}) => api.delete(`restaurants/${restaurantId}/reviews/${reviewId}`, {restaurantId, reviewId})
  const restaurantDetails = ({restaurantId}) =>
    api.get(`restaurants/${restaurantId}`)
  const createReview = ({restaurantId, data}) =>
    api.post(`restaurants/${restaurantId}/reviews`, data)
  const getAllReviews = ({data: {restaurantId = ''} = {}}) =>
    api.get(`restaurants/${restaurantId}/reviews`)
  const replyReviews = ({restaurantId, data, reviewId}) =>
    api.put(`restaurants/${restaurantId}/reviews/${reviewId}/reply`, data)
  const getRate = () => api.get('rate_limit')
  const getUser = username => api.get('search/users', {q: username})
  const userProfile = data => api.get('users/me', data)
  const editProfile = data => api.put('users/me', data)
  const allUsers = data => api.get('users', data)
  const editOtherUser = ({ data, id }) => api.put(`users/${id}`, data)
  const deleteUser = (data) => api.delete(`users/${data?._id}`, data)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    ...api,
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    signup,
    login,
    restaurants,
    restaurantDetails,
    createRestaurantApi,
    deleteRestaurant,
    deleteReview,
    createReview,
    getAllReviews,
    replyReviews,
    userProfile,
    editProfile,
    editOtherUser,
    deleteUser,
    allUsers
  }
}

// let's return back our create method as the default.
export default {
  create
}
