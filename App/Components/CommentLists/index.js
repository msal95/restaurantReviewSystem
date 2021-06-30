import React, { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon, ListItem } from 'react-native-elements'

import { Strings } from '../../Themes/Strings'
import styles from './styles'
import RestActions from '../../Redux/RestaurantRedux'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { Colors } from '../../Themes'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ROLE } from '../../Lib/constants'
import ConfirmationModal from '../ConfirmationModal'
import LoadingIndicator from '../LoadingIndicator'

function CommentLists (props) {
  const navigation = useNavigation()
  const { reviews, renderListHeader, onDeleteReview, details, deletingReview } = props

  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [reviewId, setReviewId] = useState(false)

  const { role = '' } = useSelector(
    ({ auth: { user: { role = '' } } = {} }) => ({ role }),
    shallowEqual,
  )

  function onClickItem (review) {
    navigation?.navigate('Reply', { review, isAdmin: true })
  }

  function onPressDeleteReview (item) {
    setReviewId(item?._id)
    setIsDeleteModal(true)
  }

  function closeModal () {
    setReviewId('')
    setIsDeleteModal(false)
  }

  function onDeleteConfirm () {
    closeModal()
    onDeleteReview({ reviewId, restaurantId: details?._id })
  }

  function renderListItem ({ item }) {
    const { comment, user = {} } = item || {}
    const { firstName = '', lastName = '' } = user ?? {}
    return (
      <ListItem key={item._id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            {firstName} {lastName}
          </ListItem.Title>
          <ListItem.Subtitle>
            {comment.slice(0, 30)}...
            <Text style={styles.readMore} onPress={() => onClickItem(item)}>
              {Strings.readMore}
            </Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        {role === ROLE.ADMIN && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onClickItem(item)}>
            <AntDesign name="edit" size={20} color={Colors.blue}/>
          </TouchableOpacity>
        )}
        <Icon
          raised
          disabled={reviewId === item?._id}
          name="trash-alt"
          type="font-awesome-5"
          color={Colors.fire}
          onPress={() => onPressDeleteReview(item)}/>
        <LoadingIndicator loading={reviewId === item?._id && deletingReview}/>
        <TouchableOpacity activeOpacity={0.6} onPress={() => onClickItem(item)}>
          <Text>{Strings.reply}</Text>
        </TouchableOpacity>
      </ListItem>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={item => item.id}
        data={reviews}
        ListHeaderComponent={renderListHeader}
        renderItem={renderListItem}
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
  )
}

const mapDispatchToProps = dispatch => ({
  onFetchRestaurantDetails: data =>
    dispatch(RestActions.restaurantDetails(data)),
  onCreateReview: (data, restaurantId) =>
    dispatch(RestActions.createReview(data, restaurantId)),
  onGetAllReviews: data => dispatch(RestActions.getAllReviews(data)),
  onDeleteReview: data => dispatch(RestActions.deleteReview(data)),
})

const mapStateToProps = ({
  restaurants: {
    deletingReview = false,
    restaurantDetails: { restaurantInfo = {} } = {},
    allReviews = [],
  } = {},
}) => ({
  reviews: allReviews,
  details: restaurantInfo,
  deletingReview
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentLists)
