import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Avatar, ListItem } from 'react-native-elements'
import { capitalize, ROLE } from '../../Lib/constants'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import StarRating from 'react-native-star-rating'
import { Colors, Images, Metrics } from '../../Themes'
import Modal from 'react-native-modal'
import SwipeableButton, { renderRightAction } from '../../Components/SwipeableButton'
import { Strings } from '../../Themes/Strings'
import ConfirmationModal from '../ConfirmationModal'

function ReviewItem (props) {
  const [visible, setVisible] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [reviewId, setReviewId] = useState('');
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { user, item, heading, containerStyle = {}, rPicture = '', rFullName = '' } = props
  const { fullName = '' } = user || {}
  const { comment, rating = '', user: { picture } = {}, reply } = item || {}
  const openedSwipeableRef = useRef();

  const closeModal = () => {
    setVisible(false)
    setReviewId('');
    setIsDeleteModal(false);
  }

  const onTextLayout = (e) => {
    setShowMore(e?.nativeEvent?.lines?.length > 1)
  }

  const onSwipeableOpen = ref => {
    if (openedSwipeableRef.current !== ref) {
      openedSwipeableRef.current?.close();
    }
    openedSwipeableRef.current = ref;
  };

  function onPressDeleteItem() {
    setReviewId(item?._id);
    setTimeout(() => setIsDeleteModal(true), 500);
  }


  function onPressEdit() {
    props?.navigation?.navigate({
      name: 'Reply',
      params: {review: item, isAdmin: true},
    });
  }

  function onPressReply() {
    props?.navigation?.navigate({
      name: 'Reply',
      params: { review: item},
    });
  }

  const renderRightActions = progress => {
    if (user?.role === ROLE.REGULAR || (user?.role === ROLE.OWNER && reply) || props?.disableRightActions) {
      return null;
    }

    const close = () => openedSwipeableRef.current?.close()

    if (user?.role === ROLE.ADMIN) {
      return <View style={{width: 200, flexDirection: 'row'}}>
        {renderRightAction(
          'Edit',
          Colors.blue,
          200,
          progress,
          'edit',
          onPressEdit,
          {},
          close
        )}
        {renderRightAction(
          'Remove',
          Colors.fire,
          100,
          progress,
          'trash-alt',
          onPressDeleteItem,
          {},
          close
        )}
      </View>
    }

    return (
      <View style={{width: 200, flexDirection: 'row'}}>
        {renderRightAction(
          'Reply',
          Colors.blue,
          200,
          progress,
          'edit',
          onPressReply,
          {},
          close
        )}
      </View>
    );
  };

  function onDeleteConfirm() {
    props.onDeleteReview({reviewId, restaurantId: item?.restaurant});
    closeModal();
  }

  const renderReviewItem = (lines) => {
    return (
      <View style={containerStyle}>
        {!!heading && <Text style={{
          fontSize: 15,
          color: Colors.blue,
          textTransform: 'uppercase',
          marginTop: Metrics.small
        }}>
          {heading}</Text>}
        <SwipeableButton
          activeOpacity={0.8}
          swipeContainerStyle={{}}
          onSwipeableOpen={onSwipeableOpen}
          onPressDelete={() => onPressDeleteItem(item)}
          onPressEdit={() => onPressEdit(item)}
          renderRightActions= {renderRightActions}>

        <ListItem key={user._id} bottomDivider containerStyle={{ padding:0, paddingVertical: Metrics.base,  alignItems: 'flex-start',  }}>
          <Avatar
            size="medium"
            rounded
            source={picture ? { uri: picture } : Images.userPlaceholder}
            avatarStyle={{ resizeMode: 'cover' }}
          />
          <ListItem.Content>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex:1
            }}>
              <ListItem.Title style={{flex:1}}>{capitalize(fullName)}</ListItem.Title>
              <StarRating
                maxStars={5}
                rating={rating}
                halfStarEnabled
                halfStarColor={Colors.golden}
                fullStarColor={Colors.golden}
                starSize={Metrics.fifteen}
                disabled
              />
            </View>
            <Text
              style={{}}
              numberOfLines={lines}
              onTextLayout={onTextLayout}>
              {comment}
            </Text>
            {showMore && lines && (
              <TouchableOpacity>
                <Text
                  onPress={() => setVisible(true)}
                  style={{
                    color: Colors.blue,
                    fontSize: 15,

                  }}>
                  See More
                </Text>
              </TouchableOpacity>
            )}
          </ListItem.Content>
        </ListItem>
        </SwipeableButton>
        {!!reply && (
          <View style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.cloud,
            marginVertical: Metrics.small,
            marginLeft: Metrics.doubleBase
          }}>
            <Text style={{
              fontSize: 12,
              color: Colors.blue,
              marginTop: Metrics.small,
              marginLeft: Metrics.base,
            }}>Reply</Text>
            <View
              style={{
                marginVertical: Metrics.small,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Avatar
                size="medium"
                rounded
                source={rPicture ? { uri: rPicture } : Images.userPlaceholder}
                avatarStyle={{ resizeMode: 'cover' }}
              />
              <Text style={{
                flexShrink: 1,
                fontSize: 12,
                color: Colors.border,
                marginHorizontal: Metrics.base
              }}>{reply}</Text>
            </View>
          </View>
        )}
        <ConfirmationModal
          closeModal={closeModal}
          onPressDone={onDeleteConfirm}
          onPressCancel={closeModal}
          isVisible={isDeleteModal}
          header={Strings.deleteReviewTitle}
          subHeader={Strings.deleteReviewMessage}
        />
      </View>
    )
  }

  return (
    <>
      {renderReviewItem(2)}
      <Modal
        isVisible={visible}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}

      >
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: Colors.white, borderRadius: Metrics.small }}
            contentContainerStyle={{ padding: Metrics.section, }}
          >
            {renderReviewItem()}
          </ScrollView>
        </View>
      </Modal>
    </>
  )
}

const mapStateToProps = ({
  auth: { user = {} } = {}, restaurants: {
    restaurantDetails: {
      restaurantInfo: {
        owner: {
          fullName: rFullName, picture: rPicture = {}
        } = {}
      } = {}
    } = {}
  } = {}
}) => ({
  user, rFullName, rPicture
})

export default connect(mapStateToProps)(ReviewItem)
