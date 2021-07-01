import React, {useEffect, useRef, useState} from 'react';
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
import {PAGINATION_DEFAULTS, ROLE} from '../../Lib/constants';
import {Images} from '../../Themes';

function RestaurantDetailsScreen(props) {
  const {
    route,
    onFetchRestaurantDetails,
    details,
    reviews,
    onGetAllReviews,
    totalReviewsCount,
    averageRating,
    navigation,
  } = props ?? {};
  const [comment, setComment] = useState('');
  const [dateOfVisit, setDateOfVisit] = useState('');
  const [rating, setRating] = useState('0');
  const [refreshing, setRefreshing] = useState(false);
  const flatListRefreshingRef = useRef();
  const [pageNo, setPageNo] = useState(PAGINATION_DEFAULTS.PAGE);
  const [pageSize] = useState(PAGINATION_DEFAULTS.PAGE_SIZE);
  const {restaurantId = ''} = route.params;

  useEffect(() => (flatListRefreshingRef.current = refreshing));

  const {role = ''} = useSelector(
    ({auth: {user: {role = ''}} = {}}) => ({role}),
    shallowEqual,
  );

  useEffect(() => {
    onGetAllReviews({pageNo, pageSize, restaurantId});
  }, [pageNo]);

  useEffect(() => {
    if (!props?.loading && flatListRefreshingRef.current) {
      setRefreshing(false);
    }
  }, [props?.loading]);

  useEffect(() => {
    if (role === ROLE.ADMIN || role === ROLE.OWNER) {
      navigation?.setOptions({
        headerRight: () => (
          <FormButton
            title={Strings.edit}
            onPress={() =>
              props?.navigation?.navigate({
                name: 'CreateRestaurant',
                params: {restDetails: details, isEdit: true},
              })
            }
          />
        ),
      });
    }
    onFetchRestaurantDetails({restaurantId});
    onGetAllReviews({restaurantId, pageNo, pageSize});
  }, []);

  function onRefresh() {
    setRefreshing(true);
    if (PAGINATION_DEFAULTS.PAGE === pageNo) {
      onGetAllReviews({restaurantId, pageNo, pageSize});

      return;
    }

    setPageNo(PAGINATION_DEFAULTS.PAGE);
  }

  function renderCreateReview() {
    const data = {
      rating,
      comment,
      dateOfVisit,
    };
    props?.onCreateReview(data, restaurantId);
  }

  function onEndReached() {
    if (props?.isRemaining && !props.loading) {
      setPageNo(prevState => prevState + 1);
    }
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
    if (role === ROLE.ADMIN || role === ROLE.OWNER) {
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
        onEndReached={onEndReached}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.1}
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
          source={
            details?.image
              ? {uri: details?.image}
              : Images.restaurantPlaceholder
          }
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
            <Rating imageSize={15}  fractions  startingValue={averageRating} style={{ paddingRight: 20 }} />
          </Text>
        </View>
        {role === ROLE.OWNER ? (
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
    isRevRemaining: isRemaining = false,
    revLoading: loading = false,
  } = {},
}) => ({
  totalReviewsCount,
  averageRating,
  reviews: allReviews,
  details: restaurantInfo,
  isRemaining,
  loading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantDetailsScreen);
