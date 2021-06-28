import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';

import {Strings} from '../../Themes/Strings';
import styles from './styles';
import RestActions from '../../Redux/RestaurantRedux';
import {connect} from 'react-redux';
import {printLogs} from '../../Lib/utils';

function CommentLists(props) {
  const navigation = useNavigation();
  const {reviews, renderListHeader} = props;
  function onClickItem(review) {
    navigation?.navigate('Reply', {review});
  }

  function renderListItem({item}) {
    const {comment, user = {}} = item || {};
    const {firstName = '', lastName = ''} = user ?? {};
    return (
      <ListItem key={item.id} bottomDivider>
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
        <TouchableOpacity activeOpacity={0.6} onPress={() => onClickItem(item)}>
          <Text>{Strings.reply}</Text>
        </TouchableOpacity>
      </ListItem>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        keyExtractor={item => item.id}
        data={reviews}
        ListHeaderComponent={renderListHeader}
        renderItem={renderListItem}
      />
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
  onFetchRestaurantDetails: data =>
    dispatch(RestActions.restaurantDetails(data)),
  onCreateReview: (data, restaurantId) =>
    dispatch(RestActions.createReview(data, restaurantId)),
  onGetAllReviews: data => dispatch(RestActions.getAllReviews(data)),
});

const mapStateToProps = ({
  restaurants: {
    restaurantDetails: {restaurantInfo = {}} = {},
    allReviews = [],
  } = {},
}) => ({
  reviews: allReviews,
  details: restaurantInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentLists);
