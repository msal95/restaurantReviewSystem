import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {
  Card,
  ListItem,
  Rating,
  Text as TextElement,
} from 'react-native-elements';

import styles from './styles';
import {Strings} from '../../Themes/Strings';
import InputFormField from '../../Components/InputFormField';
import FormButton from '../../Components/Button';
import RestActions from '../../Redux/RestaurantRedux';
import {connect} from 'react-redux';
import {printLogs} from '../../Lib/utils';

function CommentsReplyScreen(props) {
  const [reply, setReply] = useState('');
  const {review = {}, isAdmin = false} = props?.route?.params ?? {};

  const {
    rating: rateDb = '',
    comment: commentDb = '',
    dateOfVisit: dateOfVisitDb = '',
  } = review || {};

  const [comment, setComment] = useState(commentDb);
  const [dateOfVisit, setDateOfVisit] = useState(dateOfVisitDb);
  const [rating, setRating] = useState(rateDb);

  function commentReply() {
    const data = {
      reply,
    };
    props?.onReviewReply(data, review?.restaurant?._id, review?._id);
  }

  function renderCreateReview() {
    const data = {
      rating,
      comment,
      dateOfVisit,
    };
    props?.onUpdateReview(data, review?.restaurant?._id, review?._id);
  }

  function renderReviewUpdate() {
    return (
      <View style={styles.reviewContainer}>
        <TextElement style={styles.commentHeading} h4>
          {Strings.updateReview}
        </TextElement>
        <Rating
          showRating
          startingValue={rating}
          size={20}
          onStartRating={startingValue => setRating(startingValue)}
          style={styles.rating}
        />
        <InputFormField
          label={Strings.comment}
          placeholder={Strings.enterYourComment}
          selectedOption={comment}
          onSelect={value => setComment(value)}
          returnKeyType={'done'}
          inputContainerStyle={styles.containerInputStyle}
          multiline
        />
        <View style={styles.visitDateContainer}>
          <Text style={styles.visitDateTitle}>{Strings.visitDate} : </Text>
          <InputFormField
            label={Strings.visitDate}
            placeholder={Strings.selectDate}
            selectedOption={dateOfVisit}
            onSelect={date => setDateOfVisit(date)}
            dateTime
          />
        </View>
        <FormButton title={Strings.updateReview} onPress={renderCreateReview} />
      </View>
    );
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
          {isAdmin && (
            <ListItem.Content>
              <ListItem.Title>{review?.user?.fullName}</ListItem.Title>
              <ListItem.Subtitle>{review?.comment}</ListItem.Subtitle>
            </ListItem.Content>
          )}
          <Card.Divider />
          {isAdmin ? renderReviewUpdate() : renderCommentReply()}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapDispatchToProps = dispatch => ({
  onReviewReply: (data, restaurantId, reviewId) =>
    dispatch(RestActions.reviewReply(data, restaurantId, reviewId)),
  onUpdateReview: (data, restaurantId, reviewId) =>
    dispatch(RestActions.updateReview(data, restaurantId, reviewId)),
});

const mapStateToProps = ({restaurants: {replying} = {}}) => ({
  replying,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsReplyScreen);
