import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Card, Image, Rating, Text as TextElement } from 'react-native-elements'
import styles from './styles'
import { Strings } from '../../Themes/Strings'
import InputFormField from '../../Components/InputFormField'
import FormButton from '../../Components/Button'
import CommentLists from '../../Components/CommentLists'
import RestActions from '../../Redux/RestaurantRedux'
import { connect } from 'react-redux'

function RestaurantDetailsScreen (props) {
  const { route, navigation, onFetchRestaurantDetails, details } = props ?? {}
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState('')
  const { restaurantId = '' } = route.params

  const owner = false

  useEffect(() => {
    onFetchRestaurantDetails({ restaurantId })
  }, [])

  function renderComments () {
    if (owner) {
      return (
        <View>
          <TextElement h4>{Strings.allComments}</TextElement>
          <CommentLists/>
        </View>
      )
    }
    return (
      <View>
        <TextElement h4>{Strings.leaveAComment}</TextElement>
        <Rating showRating startingValue="{2}" defaultRating={3}
                onStartRating={(startingValue) => setRating(startingValue)} style={styles.rating}/>
        <InputFormField
          label={Strings.comment}
          placeholder={Strings.enterYourComment}
          selectedOption={comment}
          onSelect={value => setComment(value)}
          returnKeyType={'done'}
          inputContainerStyle={styles.containerInputStyle}
          multiline
        />
        <FormButton title={Strings.submitReview} onPress={() => navigation?.navigate('Home')}/>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>{details.name}</Card.Title>
          <Card.Divider/>
          <Image
            style={styles.restaurantBanner}
            resizeMode="cover"
            source={{ uri: details.image }}
          />
          <Text style={styles.description}>{details.description}</Text>
          {renderComments()}
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapDispatchToProps = dispatch => ({
  onFetchRestaurantDetails: (data) => dispatch(RestActions.restaurantDetails(data))
})

const mapStateToProps = ({  restaurants: {restaurantDetails: {restaurantInfo} = {} } = {} }) => ({
  details: restaurantInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetailsScreen)
