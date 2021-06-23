import React from 'react'
import { TouchableOpacity, FlatList, Text } from 'react-native'
import { Avatar, ListItem, Rating } from 'react-native-elements'

import { LIST } from '../../Lib/constants'
import { Strings } from '../../Themes/Strings'
import styles from './styles'

export default function HomeScreen (props) {
  function onCLickItem (item) {
    return props?.navigation?.navigate({
      name: 'RestaurantDetails',
      params: {itemId: item.id},
    })
  }

  function renderListItem ({ item, index }) {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={()=>onCLickItem(item)}>
        <ListItem key={index} bottomDivider>
          <Avatar size="large" rounded source={{ uri: item.avatar_url }}  />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.subtitle.slice(0, 30)}...<Text style={styles.readMore}>{Strings.readMore}</Text></ListItem.Subtitle>
          </ListItem.Content>
          <Rating imageSize={15} readonly startingValue={4.5} />
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={LIST}
      renderItem={renderListItem}
    />
  )
}
