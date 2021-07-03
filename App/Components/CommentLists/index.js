import React, {useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import {shallowEqual, useSelector} from 'react-redux';

import {Strings} from '../../Themes/Strings';
import ConfirmationModal from '../ConfirmationModal';
import LoadingIndicator from '../LoadingIndicator';
import styles from './styles';
import ListFooterComponent from '../ListFooterComponent';
import ListEmptyComponent from '../ListEmptyComponent';
import SwipeableButton from '../../Components/SwipeableButton';

function CommentLists(props) {
  const navigation = useNavigation();
  const {reviews, renderListHeader, onDeleteReview, details, deletingReview} =
    props;

  const openedSwipeableRef = useRef();

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [reviewId, setReviewId] = useState(false);

  const {role = ''} = useSelector(
    ({auth: {user: {role = ''}} = {}}) => ({role}),
    shallowEqual,
  );

  function onPressReview(review) {
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

  const onSwipeableOpen = ref => {
    if (openedSwipeableRef.current !== ref) {
      openedSwipeableRef.current?.close();
    }
    openedSwipeableRef.current = ref;
  };

  function renderListItem({item}) {
    const {comment, user = {}} = item || {};
    const {fullName = ''} = user ?? {};
    return (
      <SwipeableButton
        activeOpacity={0.6}
        onSwipeableOpen={onSwipeableOpen}
        onPressDelete={() => onPressDeleteReview(item)}
        onPressEdit={() => onPressReview(item)}>
        <ListItem key={item._id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title numberOfLines={1}>{fullName}</ListItem.Title>
            <ListItem.Subtitle numberOfLines={3}>{comment}</ListItem.Subtitle>
          </ListItem.Content>

          <LoadingIndicator
            loading={reviewId === item?._id && deletingReview}
          />
        </ListItem>
      </SwipeableButton>
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
