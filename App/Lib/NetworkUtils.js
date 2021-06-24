import NetInfo from '@react-native-community/netinfo'
let isConnected = false
export const checkConnected = async () => {
  isConnected = await NetInfo.fetch().then(state => {
    isConnected = state.isConnected
    return state.isConnected
  })
  return isConnected
}
checkConnected()
export default {
  isConnected
}
