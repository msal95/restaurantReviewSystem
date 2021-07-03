import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Avatar, ListItem } from 'react-native-elements'
import { capitalize } from '../../Lib/constants'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import StarRating from 'react-native-star-rating'
import { Colors, Images, Metrics } from '../../Themes'
import Modal from 'react-native-modal'

function ReviewItem (props) {
  const [visible, setVisible] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const { user, item, heading, containerStyle = {}, rPicture = '', rFullName = '' } = props
  const { fullName = '' } = user || {}
  const { comment, rating = '', user: { picture } = {}, reply } = item || {}

  const closeModal = () => {
    setVisible(false)
  }

  const onTextLayout = (e) => {
    setShowMore(e?.nativeEvent?.lines?.length > 1)
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
        <ListItem key={user._id} bottomDivider>
          <Avatar
            size="medium"
            rounded
            source={picture ? { uri: picture } : Images.userPlaceholder}
            avatarStyle={{ resizeMode: 'cover' }}
          />
          <ListItem.Content>
            <ListItem.Title>{capitalize(fullName)}</ListItem.Title>
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
          <StarRating
            maxStars={5}
            rating={rating}
            halfStarEnabled
            halfStarColor={Colors.golden}
            fullStarColor={Colors.golden}
            starSize={Metrics.fifteen}
            disabled
          />
        </ListItem>
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
            style={{ backgroundColor: Colors.white, borderRadius: Metrics.base }}
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
