import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Card, ListItem, Text as TextElement} from 'react-native-elements';

import styles from './styles';
import {Strings} from '../../Themes/Strings';
import InputFormField from '../../Components/InputFormField';
import FormButton from '../../Components/Button';
import RestActions from '../../Redux/RestaurantRedux';
import {connect} from 'react-redux';

function CommentsReplyScreen(props) {
  const [reply, setReply] = useState('');
  const {review} = props?.route?.params ?? {};

  function commentReply() {
    const data = {
      reply,
    };
    props?.onReviewReply(data, review?.restaurant?._id, review?._id);
  }

  function renderCommentReply() {
    return (
      <View>
        <TextElement h4 style={styles.h4Style}>
          {Strings.leaveAReply}
        </TextElement>
        <View>
          <InputFormField
            label={Strings.reply}
            placeholder={Strings.enterReply}
            selectedOption={reply}
            onSelect={value => setReply(value)}
            returnKeyType={'done'}
            inputContainerStyle={styles.containerInputStyle}
            multiline
          />
          <FormButton
            loading={props?.replying}
            title={Strings.reply}
            onPress={commentReply}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.cardContainer}>
          <ListItem.Content>
            <ListItem.Title>{review?.user?.fullName}</ListItem.Title>
            <ListItem.Subtitle>{review?.comment}</ListItem.Subtitle>
          </ListItem.Content>
          <Card.Divider />
          {renderCommentReply()}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapDispatchToProps = dispatch => ({
  onReviewReply: (data, restaurantId, reviewId) =>
    dispatch(RestActions.reviewReply(data, restaurantId, reviewId)),
});

const mapStateToProps = ({restaurants: {replying} = {}}) => ({
  replying,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsReplyScreen);
