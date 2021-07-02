import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {
  Card,
  ListItem,
  Rating,
  Text as TextElement,
} from 'react-native-elements';
import {Formik} from 'formik';

import styles from './styles';
import {Strings} from '../../Themes/Strings';
import InputFormField from '../../Components/InputFormField';
import FormButton from '../../Components/Button';
import RestActions from '../../Redux/RestaurantRedux';
import {connect} from 'react-redux';
import {errorMessage} from '../../Lib/utils';
import {reviewRestaurantValidationSchema} from '../../Services/ValidationSchema/ReviewRestaurantValidationSchema';
import {replyReviewValidationSchema} from '../../Services/ValidationSchema/ReplyReviewValidationSchema';

function CommentsReplyScreen(props) {
  const {review = {}, isAdmin = false, navigation} = props?.route?.params ?? {};

  useEffect(() => {
    if (isAdmin) {
      navigation?.setOptions({
        headerTitle: Strings.updateReview,
      });
    }
  }, []);

  const reviewInfo = review || {};

  const [rating, setRating] = useState(reviewInfo?.rating);
  function onUpdateReview(values) {
    const data = {
      ...values,
      rating,
    };
    props?.onUpdateReview(data, review?.restaurant?._id, review?._id);
  }

  function renderReviewUpdate() {
    return (
      <Formik
        validationSchema={reviewRestaurantValidationSchema}
        initialValues={{
          comment: reviewInfo?.comment ?? '',
          dateOfVisit: reviewInfo?.dateOfVisit ?? '',
        }}
        onSubmit={onUpdateReview}>
        {({
          handleSubmit,
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
        }) => (
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
              selectedOption={values?.comment ?? ''}
              onSelect={handleChange('comment')}
              onBlur={handleBlur('comment')}
              returnKeyType={'done'}
              inputContainerStyle={styles.containerInputStyle}
              multiline
            />
            {errorMessage(errors?.comment, touched.comment)}

            <View style={styles.visitDateContainer}>
              <Text style={styles.visitDateTitle}>{Strings.visitDate} : </Text>
              <InputFormField
                label={Strings.visitDate}
                placeholder={Strings.selectDate}
                selectedOption={values?.dateOfVisit ?? ''}
                onSelect={handleChange('dateOfVisit')}
                onBlur={handleBlur('dateOfVisit')}
                dateTime
              />
              {errorMessage(errors?.dateOfVisit, touched.dateOfVisit)}
            </View>
            <FormButton
              title={Strings.updateReview}
              loading={props?.loading}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    );
  }

  function renderCommentReply() {
    return (
      <Formik
        validationSchema={replyReviewValidationSchema}
        initialValues={{
          reply: '',
        }}
        onSubmit={props?.onReviewReply}>
        {({
          handleSubmit,
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
        }) => (
          <View>
            <TextElement h4 style={styles.h4Style}>
              {Strings.leaveAReply}
            </TextElement>
            <View>
              <InputFormField
                label={Strings.reply}
                placeholder={Strings.enterReply}
                selectedOption={values?.reply ?? ''}
                onSelect={handleChange('reply')}
                onBlur={handleBlur('reply')}
                returnKeyType={'done'}
                inputContainerStyle={styles.containerInputStyle}
                multiline
              />
              {errorMessage(errors?.reply, touched.reply)}

              <FormButton
                loading={props?.replying}
                title={Strings.reply}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.cardContainer}>
          {!isAdmin && (
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
