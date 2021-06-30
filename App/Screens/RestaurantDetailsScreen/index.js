import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {
  Card,
  Image,
  ListItem,
  Rating,
  Text as TextElement,
} from 'react-native-elements';
import {connect, shallowEqual, useSelector} from 'react-redux';

import styles from './styles';
import {Strings} from '../../Themes/Strings';
import InputFormField from '../../Components/InputFormField';
import FormButton from '../../Components/Button';
import CommentLists from '../../Components/CommentLists';
import RestActions from '../../Redux/RestaurantRedux';

function RestaurantDetailsScreen(props) {
  const {
    route,
    onFetchRestaurantDetails,
    details,
    reviews,
    onGetAllReviews,
    totalReviewsCount,
    averageRating,
  } = props ?? {};

  const [comment, setComment] = useState('');
  const [dateOfVisit, setDateOfVisit] = useState('');
  const [rating, setRating] = useState('0');
  const {restaurantId = ''} = route.params;

  const {role = ''} = useSelector(
    ({auth: {user: {role = ''}} = {}}) => ({role}),
    shallowEqual,
  );

  useEffect(() => {
    onFetchRestaurantDetails({restaurantId});
    onGetAllReviews({restaurantId});
  }, []);

  function renderCreateReview() {
    const data = {
      rating,
      comment,
      dateOfVisit,
    };
    props?.onCreateReview(data, restaurantId);
  }

  function renderCommentsList({item, index}) {
    const {rating: commentRating, comment: commentText, user = {}} = item || {};
    const {firstName = '', lastName = ''} = user ?? {};
    return (
      <ListItem key={user.id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            {firstName} {lastName}
          </ListItem.Title>
          <ListItem.Subtitle>{commentText}</ListItem.Subtitle>
        </ListItem.Content>
        <Rating imageSize={15} readonly startingValue={commentRating} />
      </ListItem>
    );
  }

  function renderListFooter() {
    return (
      <View style={styles.reviewContainer}>
        <TextElement style={styles.commentHeading} h4>
          {Strings.leaveAComment}
        </TextElement>
        <Rating
          showRating
          startingValue={3}
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
        <FormButton title={Strings.submitReview} onPress={renderCreateReview} />
      </View>
    );
  }

  function renderComments() {
    if (role === 'OWNER' || role === 'ADMIN') {
      return (
        <CommentLists renderListHeader={renderListHeader} reviews={reviews} />
      );
    }

    return (
      <FlatList
        keyExtractor={(item, index) => String(item?._id ?? index)}
        initialNumToRender={3}
        data={reviews}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        renderItem={renderCommentsList}
      />
    );
  }

  function renderListHeader() {
    return (
      <View style={styles.flatListHeader}>
        <Card.Title>{details.name}</Card.Title>
        <Card.Divider />
        <Image
          style={styles.restaurantBanner}
          resizeMode="cover"
          source={{uri: details.image}}
        />
        <Text style={styles.descriptionTitle}>{Strings.description}</Text>
        <Text style={styles.description}>{details.description}</Text>
        <View style={styles.separator}>
          <Text style={styles.reviewsTitle}>
            {Strings.totalReviews}
            {totalReviewsCount}
          </Text>
          <Text style={styles.reviewsTitle}>
            {Strings.avgRating}
            <Rating imageSize={15} readonly startingValue={averageRating} />
          </Text>
        </View>
        {role === 'OWNER' ? (
          <TextElement h4>{Strings.allComments}</TextElement>
        ) : (
          <TextElement style={styles.commentHeading} h4>
            {Strings.previousReviews}
          </TextElement>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>{renderComments()}</View>
    </SafeAreaView>
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
    restaurantDetails: {
      restaurantInfo = {},
      totalReviewsCount,
      averageRating,
    } = {},
    allReviews = [],
  } = {},
}) => ({
  totalReviewsCount,
  averageRating,
  reviews: allReviews,
  details: restaurantInfo,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantDetailsScreen);
