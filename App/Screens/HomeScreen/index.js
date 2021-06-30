import React, { useEffect, useState } from 'react'
import {FlatList, Text, TouchableOpacity} from 'react-native';
import { Avatar, Icon, ListItem, Rating } from 'react-native-elements'
import {connect} from 'react-redux';

import {Strings} from '../../Themes/Strings';
import FormButton from '../../Components/Button';
import AuthActions from '../../Redux/AuthRedux';
import RestActions from '../../Redux/RestaurantRedux';
import styles from './styles';
import { Colors, Images } from '../../Themes'
import LoadingIndicator from '../../Components/LoadingIndicator'

function HomeScreen(props) {
  const {onFetchRestaurantsList, navigation, data, deletingRestaurant, onDeleteRestaurant} = props;
  const [restaurantId, setRestaurantId] = useState('')

  useEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <FormButton title={Strings.logout} onPress={() => props?.onLogout()} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    onFetchRestaurantsList();
  }, []);

  function onPressDeleteItem(item) {
    setRestaurantId(item?._id)
    onDeleteRestaurant({ _id: item?._id })
  }

  function onCLickItem(item) {
    return props?.navigation?.navigate({
      name: 'RestaurantDetails',
      params: {restaurantId: item?._id},
    });
  }

  function renderListItem({item, index}) {
    const {image, name, description, averageRating = 3} = item || {};
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => onCLickItem(item)}>
        <ListItem key={item._id} bottomDivider>
          <Avatar size="large" rounded source={!!image ? {uri: image} : Images.restaurantPlaceholder} />
          <ListItem.Content>
            <ListItem.Title >{name}</ListItem.Title>
            <ListItem.Subtitle>
              {description.slice(0, 30)}...
              <Text style={styles.readMore}>{Strings.readMore}</Text>
            </ListItem.Subtitle>
          </ListItem.Content>
          <Rating imageSize={15} readonly startingValue={averageRating} />
          <Icon
            disabled={restaurantId === item?._id}
            name="trash-alt"
            type="font-awesome-5"
            color={Colors.fire}
            onPress={() => onPressDeleteItem(item)}/>
          <ListItem.Chevron />
        </ListItem>
        <LoadingIndicator loading={item?._id === restaurantId && deletingRestaurant} />
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      keyExtractor={item => String(item?._id)}
      extraData={props}
      data={data}
      renderItem={renderListItem}
    />
  );
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(AuthActions.logout()),
  onFetchRestaurantsList: () => dispatch(RestActions.restaurantsList()),
  onDeleteRestaurant: (data) => dispatch(RestActions.deleteRestaurant(data)),
});

const mapStateToProps = ({restaurants: {restaurantsList = [], deletingRestaurant=false} = {}}) => ({
  data: restaurantsList,deletingRestaurant
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
