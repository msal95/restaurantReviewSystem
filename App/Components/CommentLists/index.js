import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon, ListItem} from 'react-native-elements';

import {Strings} from '../../Themes/Strings';
import {shallowEqual, useSelector} from 'react-redux';
import {Colors} from '../../Themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ROLE} from '../../Lib/constants';
import ConfirmationModal from '../ConfirmationModal';
import LoadingIndicator from '../LoadingIndicator';
import styles from './styles';
import ListFooterComponent from '../ListFooterComponent'
import ListEmptyComponent from '../ListEmptyComponent'

function CommentLists(props) {
  const navigation = useNavigation();
  const {reviews, renderListHeader, onDeleteReview, details, deletingReview} =
    props;

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [reviewId, setReviewId] = useState(false);

  const {role = ''} = useSelector(
    ({auth: {user: {role = ''}} = {}}) => ({role}),
    shallowEqual,
  );

  function onClickItem(review) {
    navigation?.navigate('Reply', {review, isAdmin: true});
  }

  function onPressDeleteReview(item) {
    setReviewId(item?._id);
    setIsDeleteModal(true);
  }

  function closeModal() {
    setReviewId('');
    setIsDeleteModal(false);
  }

  function onDeleteConfirm() {
    closeModal();
    onDeleteReview({reviewId, restaurantId: details?._id});
  }

  function renderListItem({item}) {
    const {comment, user = {}} = item || {};
    const {firstName = '', lastName = ''} = user ?? {};
    return (
      <ListItem key={item._id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            {firstName} {lastName}
          </ListItem.Title>
          <ListItem.Subtitle>{comment.slice(0, 30)}...</ListItem.Subtitle>
        </ListItem.Content>
        {role === ROLE.ADMIN && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onClickItem(item)}>
            <AntDesign name="edit" size={20} color={Colors.blue} />
          </TouchableOpacity>
        )}
        <Icon
          raised
          disabled={reviewId === item?._id}
          name="trash-alt"
          type="font-awesome-5"
          color={Colors.fire}
          onPress={() => onPressDeleteReview(item)}
        />
        <LoadingIndicator loading={reviewId === item?._id && deletingReview} />
        <TouchableOpacity activeOpacity={0.6} onPress={() => onClickItem(item)}>
          <Text>{Strings.reply}</Text>
        </TouchableOpacity>
      </ListItem>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        keyExtractor={item => item.id}
        data={reviews}
        ListHeaderComponent={renderListHeader}
        renderItem={renderListItem}
        onEndReached={props.onEndReached}
        refreshing={props.refreshing}
        onRefresh={props.onRefresh}
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
        header={Strings.deleteReviewTitle}
        subHeader={Strings.deleteReviewMessage}
      />
    </View>
  );
}

export default CommentLists;
