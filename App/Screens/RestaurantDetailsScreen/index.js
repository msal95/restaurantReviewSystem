import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native'
import { Card, Text as TextElement, } from 'react-native-elements'
import StarRating from 'react-native-star-rating'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { Formik } from 'formik'

import styles from './styles'
import { Strings } from '../../Themes/Strings'
import InputFormField from '../../Components/InputFormField'
import FormButton from '../../Components/Button'
import RestActions from '../../Redux/RestaurantRedux'
import { PAGINATION_DEFAULTS, ROLE } from '../../Lib/constants'
import { Colors, Images, Metrics } from '../../Themes'
import { reviewRestaurantValidationSchema } from '../../Services/ValidationSchema/ReviewRestaurantValidationSchema'
import { errorMessage } from '../../Lib/utils'
import ListEmptyComponent from '../../Components/ListEmptyComponent'
import ReviewItem from '../../Components/ReviewItem'

function RestaurantDetailsScreen (props) {
  const {
    route,
    onFetchRestaurantDetails,
    details,
    reviews,
    onGetAllReviews,
    totalReviewsCount,
    averageRating,
    highestRatedReview,
    lowestRatedReview,
    lastReview,
  } = props ?? {}

  const [rating, setRating] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const flatListRefreshingRef = useRef()
  const [pageNo, setPageNo] = useState(PAGINATION_DEFAULTS.PAGE)
  const [pageSize] = useState(PAGINATION_DEFAULTS.PAGE_SIZE)
  const { restaurantId = '' } = route.params

  useEffect(() => (flatListRefreshingRef.current = refreshing))

  const { role = '' } = useSelector(
    ({ auth: { user: { role = '' } } = {} }) => ({ role }),
    shallowEqual,
  )

  useEffect(() => {
    onGetAllReviews({ pageNo, pageSize, restaurantId })
  }, [pageNo])

  useEffect(() => {
    if (!props?.loading && flatListRefreshingRef.current) {
      setRefreshing(false)
    }
  }, [props?.loading])

  useEffect(() => {
    onFetchRestaurantDetails({ restaurantId })
    onGetAllReviews({ restaurantId, pageNo, pageSize })
  }, [])

  function onRefresh () {
    setRefreshing(true)
    if (PAGINATION_DEFAULTS.PAGE === pageNo) {
      onGetAllReviews({ restaurantId, pageNo, pageSize })

      return
    }

    setPageNo(PAGINATION_DEFAULTS.PAGE)
  }

  function onCreateReview (values) {
    const data = {
      ...values,
      rating,
    }
    props?.onCreateReview(data, restaurantId)
  }

  function onEndReached () {
    if (props?.isRemaining && !props.loading) {
      setPageNo(prevState => prevState + 1)
    }
  }

  function renderCommentsList ({ item, index }) {
    const { rating: commentRating, comment: commentText, user = {} } = item || {}
    const { fullName } = user ?? {}

    return (
      <ReviewItem item={item} containerStyle={{ paddingHorizontal: Metrics.base, }} heading={index === 0 ? Strings.otherReviews : ''}/>
    )
  }

  function renderListFooter () {

    if (role !== ROLE.REGULAR || props?.isReviewed) {
      return null
    }

    return (
      <Formik
        validationSchema={reviewRestaurantValidationSchema}
        initialValues={{
          comment: '',
          dateOfVisit: '',
        }}
        onSubmit={onCreateReview}>
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
              {Strings.leaveAComment}
            </TextElement>
            <View style={styles.ratingContainer}>
              <StarRating
                maxStars={5}
                rating={rating}
                halfStarColor={Colors.golden}
                fullStarColor={Colors.golden}
                selectedStar={startingValue => setRating(startingValue)}
              />
            </View>
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
              <Text style={styles.visitDateTitle}>{Strings.visitDate}</Text>
              <InputFormField
                label={Strings.visitDate}
                placeholder={Strings.selectDate}
                selectedOption={values?.dateOfVisit ?? ''}
                onSelect={handleChange('dateOfVisit')}
                onBlur={handleBlur('dateOfVisit')}
                dateTime
              />
            </View>
            {errorMessage(errors?.dateOfVisit, touched.dateOfVisit, styles.dateError)}
            <FormButton title={Strings.submitReview} onPress={handleSubmit}/>
          </View>
        )}
      </Formik>
    )
  }

  function renderComments () {

    return (
      <FlatList
        keyExtractor={(item, index) => String(item?._id ?? index)}
        initialNumToRender={3}
        data={reviews}
        extraData={reviews}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        renderItem={renderCommentsList}
        onEndReached={onEndReached}
        refreshing={refreshing}
        contentContainerStyle={{ backgroundColor: Colors.white }}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          <ListEmptyComponent
            loading={props?.loading}
            message={Strings.noRecordFound}
          />
        }
      />
    )
  }

  function renderListHeader () {
    return (
      <View style={styles.flatListHeader}>
        <Card.Title>{details.name}</Card.Title>
        <Card.Divider/>
        <Image
          style={styles.restaurantBanner}
          resizeMode="cover"
          source={
            details?.image
              ? { uri: details?.image }
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
            <StarRating
              disabled
              maxStars={5}
              rating={averageRating}
              halfStarEnabled
              halfStarColor={Colors.golden}
              fullStarColor={Colors.golden}
              starSize={Metrics.fifteen}
            />
          </Text>
        </View>
        {role === ROLE.OWNER ? (
          <TextElement h4>{Strings.allComments}</TextElement>
        ) : (
          <>
            <ReviewItem heading={Strings.highestRatedReview} item={highestRatedReview} key={Strings.highestRatedReview}/>
            <ReviewItem heading={Strings.lowestRatedReview} item={lowestRatedReview} key={Strings.lowestRatedReview}/>
            <ReviewItem heading={Strings.lastReview} item={lastReview} key={Strings.lastReview}/>
          </>
        )}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>{renderComments()}</View>
    </SafeAreaView>
  )
}

const mapDispatchToProps = dispatch => ({
  onFetchRestaurantDetails: data =>
    dispatch(RestActions.restaurantDetails(data)),
  onCreateReview: (data, restaurantId) =>
    dispatch(RestActions.createReview(data, restaurantId)),
  onGetAllReviews: data => dispatch(RestActions.getAllReviews(data)),
})

const mapStateToProps = ({
  restaurants: {
    restaurantDetails: {
      restaurantInfo = {},
      highestRatedReview = {},
      lowestRatedReview = {},
      lastReview = {},
      totalReviewsCount,
      averageRating,
      isReviewed,
    } = {},
    allReviews = [],
    isRevRemaining: isRemaining = false,
    revLoading: loading = false,
  } = {},
}) => ({
  totalReviewsCount,
  averageRating,
  highestRatedReview,
  lowestRatedReview,
  lastReview,
  reviews: allReviews,
  details: restaurantInfo,
  isRemaining,
  isReviewed,
  loading,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantDetailsScreen)
