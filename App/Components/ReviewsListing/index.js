import React from 'react';
import {connect} from 'react-redux';
import RestActions from '../../Redux/RestaurantRedux';
import {ListItem, Rating, Text as TextElement} from 'react-native-elements';
import {capitalize} from '../../Lib/constants';
import AuthActions from '../../Redux/AuthRedux';
import {Strings} from '../../Themes/Strings';
import {Text, View} from 'react-native';
import {printLogs} from '../../Lib/utils';

function ReviewsListing(props) {
  const {user, highestRatedReview} = props;
  printLogs({highestRatedReview});
  const {fullName = '', picture = ''} = user || {};
  const {comment, rating = ''} = highestRatedReview || {};
  printLogs({rating});
  return (
    <View>
      <Text>{Strings.highestRatedReview}</Text>
      <ListItem key={user.id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{capitalize(fullName)}</ListItem.Title>
          <ListItem.Subtitle>{comment}</ListItem.Subtitle>
        </ListItem.Content>
        <Rating imageSize={15} readonly startingValue={rating} />
      </ListItem>
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
  onGetUserProfile: data => dispatch(AuthActions.userProfile(data)),
});

const mapStateToProps = ({auth: {user = {}} = {}}) => ({
  user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsListing);
