import React from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ListItem } from 'react-native-elements'

import { COMMENTS } from '../../Lib/constants'
import { Strings } from '../../Themes/Strings'
import styles from './styles'

export default function CommentLists (props) {
  const navigation = useNavigation()

  function onCLickItem (item) {
    navigation?.navigate({
      name: 'Reply',
      params: { itemId: item.id },
    })
  }

  function renderListItem ({ item }) {
    return (
      <ListItem key={item.id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.subtitle.slice(0, 30)}...<Text
            style={styles.readMore}  onPress={()=>onCLickItem(item)}>{Strings.readMore}</Text></ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => onCLickItem(item)}>
          <Text>{Strings.reply}</Text>
        </TouchableOpacity>
      </ListItem>
    )
  }

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={COMMENTS}
      renderItem={renderListItem}
    />
  )
}
