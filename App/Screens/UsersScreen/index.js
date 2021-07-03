import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import Foundation from 'react-native-vector-icons/Foundation';
import moment from 'moment';

import {Strings} from '../../Themes/Strings';
import AuthActions from '../../Redux/AuthRedux';
import {Colors, Images} from '../../Themes';
import LoadingIndicator from '../../Components/LoadingIndicator';
import styles from './styles';
import ConfirmationModal from '../../Components/ConfirmationModal';
import {capitalize, PAGINATION_DEFAULTS} from '../../Lib/constants';
import ListFooterComponent from '../../Components/ListFooterComponent';
import ListEmptyComponent from '../../Components/ListEmptyComponent';
import SwipeableButton from '../../Components/SwipeableButton';

function UsersScreen(props) {
  const {allUsers, onDeleteUser, deletingUser, getAllUsers, navigation} = props;
  const [userId, setUserId] = useState('');
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [pageNo, setPageNo] = useState(PAGINATION_DEFAULTS.PAGE);
  const [pageSize] = useState(PAGINATION_DEFAULTS.PAGE_SIZE);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRefreshingRef = useRef();
  const openedSwipeableRef = useRef();

  useEffect(() => (flatListRefreshingRef.current = refreshing));

  useEffect(() => {
    getAllUsers({pageNo, pageSize});
  }, [pageNo]);

  useEffect(() => {
    getAllUsers({pageNo, pageSize});
  }, []);

  useEffect(() => {
    if (!props?.loading && flatListRefreshingRef.current) {
      setRefreshing(false);
    }
  }, [props?.loading]);

  function onCLickItem(item) {
    navigation?.navigate({
      name: 'UserProfile',
      params: {user: item, isSelf: false},
    });
  }

  function onRefresh() {
    setRefreshing(true);
    if (PAGINATION_DEFAULTS.PAGE === pageNo) {
      getAllUsers({pageNo, pageSize});

      return;
    }

    setPageNo(PAGINATION_DEFAULTS.PAGE);
  }

  function onPressDeleteUser({_id} = {}) {
    setUserId(_id);
    setIsDeleteModal(true);
  }

  function closeModal() {
    setUserId('');
    setIsDeleteModal(false);
  }

  function onEndReached() {
    if (props?.isRemaining && !props.loading) {
      setPageNo(prevState => prevState + 1);
    }
  }

  function onDeleteConfirm() {
    closeModal();
    onDeleteUser({_id: userId});
  }

  const onSwipeableOpen = ref => {
    if (openedSwipeableRef.current !== ref) {
      openedSwipeableRef.current?.close();
    }
    openedSwipeableRef.current = ref;
  };

  function openDialPad() {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  }

  function onPressEdit(item) {
    navigation.navigate('SignUp', {
      isEditing: true,
      isSelf: false,
      otherUser: item,
    });
  }

  function renderListItem({item, index}) {
    const {fullName, role, picture, phoneNo, createdAt} = item || {};

    return (
      <SwipeableButton
        activeOpacity={0.6}
        onSwipeableOpen={onSwipeableOpen}
        onPressDelete={() => onPressDeleteUser(item)}
        onPressEdit={() => onPressEdit(item)}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => onCLickItem(item)}>
          <ListItem
            key={String(item?._id ?? index)}
            bottomDivider
            containerStyle={styles.container}>
            <Avatar
              size="large"
              rounded
              source={picture ? {uri: picture} : Images.userPlaceholder}
              avatarStyle={styles.avatarStyle}
            />

            <ListItem.Content style={styles.itemContainer}>
              <ListItem.Title style={styles.title}>
                {capitalize(fullName)}
              </ListItem.Title>
              <ListItem.Subtitle>{capitalize(role)}</ListItem.Subtitle>
              <View style={styles.itemsInfo}>
                <ListItem.Subtitle style={styles.infoDate}>
                  <Text style={styles.infoDateText}>
                    {createdAt && moment(createdAt).format('LL')}
                  </Text>
                </ListItem.Subtitle>
                <TouchableOpacity
                  onPress={openDialPad}
                  activeOpacity={0.6}
                  style={styles.infoDatePhone}>
                  <Foundation
                    name="telephone-accessible"
                    size={20}
                    color={Colors.blue}
                  />
                  <Text style={styles.phoneText}> {phoneNo}</Text>
                </TouchableOpacity>
              </View>
            </ListItem.Content>

            <ListItem.Chevron iconStyle={styles.iconStyle} />
          </ListItem>

          <LoadingIndicator loading={deletingUser && userId === item?._id} />
        </TouchableOpacity>
      </SwipeableButton>
    );
  }

  return (
    <>
      <FlatList
        keyExtractor={item => String(item?._id)}
        data={allUsers}
        renderItem={renderListItem}
        onEndReached={onEndReached}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <ListFooterComponent loading={props?.pageNo > 0 && props?.loading} />
        }
        ListEmptyComponent={
          <ListEmptyComponent
            loading={props?.loading}
            message={Strings.noRecordFound}
          />
        }
      />

      <ConfirmationModal
        closeModal={closeModal}
        onPressDone={onDeleteConfirm}
        onPressCancel={closeModal}
        isVisible={isDeleteModal}
        header={Strings.deleteRestaurantTitle}
        subHeader={Strings.deleteRestaurantMessage}
      />
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  getAllUsers: data => dispatch(AuthActions.allUsers(data)),
  onDeleteUser: data => dispatch(AuthActions.deleteUser(data)),
});

const mapStateToProps = ({
  auth: {
    allUsers = [],
    deletingUser = false,
    isRemaining = false,
    loading = false,
  } = {},
}) => ({
  allUsers,
  deletingUser,
  isRemaining,
  loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);
