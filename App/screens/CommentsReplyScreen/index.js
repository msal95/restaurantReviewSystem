import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { Card, ListItem, Text as TextElement } from 'react-native-elements'

import { COMMENTS } from '../../Lib/constants'
import styles from './styles'
import { Strings } from '../../Themes/Strings'
import InputFormField from '../../Components/InputFormField'
import FormButton from '../../Components/Button'

export default function CommentsReplyScreen ({ route, navigation }) {
  const [reply, setReply] = useState('')

  const { itemId } = route.params
  const selectedListItem = COMMENTS.find(list => list.id === itemId)

  function renderComments () {
    return (
      <View>
        <TextElement h4 style={styles.h4Style}>{Strings.leaveAReply}</TextElement>
        <View>
          <InputFormField
            label={Strings.reply}
            placeholder={Strings.enterReply}
            selectedOption={reply}
            onSelect={(value) => setReply(value)}
            returnKeyType={'done'}
            inputContainerStyle={styles.containerInputStyle}
            multiline
          />
          <FormButton title={Strings.reply} onPress={() => navigation?.goBack()}/>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.cardContainer}>
          <ListItem.Content>
            <ListItem.Title>{selectedListItem.name}</ListItem.Title>
            <ListItem.Subtitle>{selectedListItem.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          <Card.Divider/>
          {renderComments()}
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}
