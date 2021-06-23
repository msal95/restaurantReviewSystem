import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Card, Image, Text as TextElement, Rating } from 'react-native-elements'

import { LIST } from '../../Lib/constants'
import styles from './styles'
import { Strings } from '../../Themes/Strings'
import InputFormField from '../../Components/InputFormField'
import FormButton from '../../Components/Button'
import CommentLists from '../../Components/CommentLists'

export default function RestaurantDetailsScreen ({ route, navigation }) {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState('')

  const { itemId } = route.params
  const selectedListItem = LIST.find(list => list.id === itemId)

  const owner = true

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
        <Rating showRating fractions="{1}" startingValue="{1.9}"
                onStartRating={(startingValue) => setRating(startingValue)} style={styles.rating}/>
        <InputFormField
          label={Strings.comment}
          placeholder={Strings.enterYourComment}
          selectedOption={comment}
          onSelect={value => setComment(value)}
          returnKeyType={'done'}
          inputContainerStyle={styles.containerInputStyle}
        />
        <FormButton title={Strings.submitReview} onPress={() => navigation?.navigate('Home')}/>
      </View>
    )
  }

return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>{selectedListItem.name}</Card.Title>
        <Card.Divider/>
        <Image
          style={styles.restaurantBanner}
          resizeMode="cover"
          source={{ uri: selectedListItem.avatar_url }}
        />
        <Text style={styles.description}>{selectedListItem.subtitle}</Text>
        {renderComments()}
      </Card>
    </ScrollView>
  </SafeAreaView>
)
}
