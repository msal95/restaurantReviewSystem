import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Avatar, Icon, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import { Strings } from '../../Themes/Strings'
import FormButton from '../../Components/Button'
import AuthActions from '../../Redux/AuthRedux'
import { Colors, Images } from '../../Themes'
import LoadingIndicator from '../../Components/LoadingIndicator'
import styles from './styles'

function UsersScreen (props) {
  const { navigation, allUsers, onDeleteUser, deletingUser } = props
  const [userId, setUserId] = useState('')
  useEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <FormButton title={Strings.logout} onPress={() => props?.onLogout()}/>
      ),
    })
  }, [])

  useEffect(() => {
    props.getAllUsers()
  }, [])

  function onCLickItem (item) {
    return props?.navigation?.navigate({
      name: 'UserProfile',
      params: { user: item, isSelf: false },
    })
  }

  function onPressDeleteUser ({ _id } = {}) {
    setUserId(_id)
    onDeleteUser({ _id })
  }

  function renderListItem ({ item, index }) {
    const { fullName, role, picture } = item || {}
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => onCLickItem(item)}>
        <ListItem key={String(item._id ?? index)} bottomDivider>
          <Avatar size="large" rounded source={!!picture ? { uri: picture } : Images.userPlaceholder} avatarStyle={styles.avatarStyle}/>
          <ListItem.Content>
            <ListItem.Title>{fullName}</ListItem.Title>
            <ListItem.Subtitle>{role}</ListItem.Subtitle>
          </ListItem.Content>
          <Icon
            raised
            disabled={userId === item?._id}
            name="trash-alt"
            type="font-awesome-5"
            color={Colors.fire}
            onPress={() => onPressDeleteUser(item)}/>
          <ListItem.Chevron/>
        </ListItem>
        <LoadingIndicator loading={deletingUser && userId === item?._id}/>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      keyExtractor={item => String(item?._id)}
      data={allUsers}
      renderItem={renderListItem}
    />

  )
}

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(AuthActions.allUsers()),
  onDeleteUser: (data) => dispatch(AuthActions.deleteUser(data)),
})

const mapStateToProps = ({ auth: { allUsers = [], deletingUser = false } = {} }) => ({
  allUsers,
  deletingUser
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen)
