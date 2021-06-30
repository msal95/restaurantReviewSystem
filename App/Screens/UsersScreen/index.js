import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';

import {Strings} from '../../Themes/Strings';
import FormButton from '../../Components/Button';
import AuthActions from '../../Redux/AuthRedux';

function UsersScreen(props) {
  const {navigation, allUsers} = props;

  useEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <FormButton title={Strings.logout} onPress={() => props?.onLogout()} />
      ),
    });
  }, []);

  useEffect(() => {
    props.getAllUsers();
  }, []);

  function onCLickItem(item) {
    return props?.navigation?.navigate({
      name: 'UserProfile',
      params: {user: item, isSelf: false},
    });
  }

  function renderListItem({item, index}) {
    const {fullName, role, picture} = item || {};
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => onCLickItem(item)}>
        <ListItem key={String(item._id ?? index)} bottomDivider>
          <Avatar size="large" rounded source={{uri: picture}} />
          <ListItem.Content>
            <ListItem.Title>{fullName}</ListItem.Title>
            <ListItem.Subtitle>{role}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      keyExtractor={item => String(item?._id)}
      data={allUsers}
      renderItem={renderListItem}
    />
  );
}

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(AuthActions.allUsers()),
});

const mapStateToProps = ({auth: {allUsers = []} = {}}) => ({
  allUsers,
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);
