import React, { useEffect, useRef, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Avatar, ListItem, Rating } from 'react-native-elements'
import { connect, shallowEqual, useSelector } from 'react-redux'

import { Strings } from '../../Themes/Strings'
import FormButton from '../../Components/Button'
import AuthActions from '../../Redux/AuthRedux'
import RestActions from '../../Redux/RestaurantRedux'
import { Images } from '../../Themes'
import LoadingIndicator from '../../Components/LoadingIndicator'
import ConfirmationModal from '../../Components/ConfirmationModal'
import { PAGINATION_DEFAULTS, ROLE } from '../../Lib/constants'
import SwipeableButton from '../../Components/SwipeableButton'
import { printLogs } from '../../Lib/utils'

function HomeScreen (props) {
  const {
    onFetchRestaurantsList,
    navigation,
    data,
    deletingRestaurant,
    onDeleteRestaurant,
  } = props
  const [refreshing, setRefreshing] = useState(false)
  const [restaurantId, setRestaurantId] = useState('')
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [pageNo, setPageNo] = useState(PAGINATION_DEFAULTS.PAGE)
  const [pageSize] = useState(PAGINATION_DEFAULTS.PAGE_SIZE)
  const flatListRefreshingRef = useRef()
  const openedSwipeableRef = useRef()

  useEffect(() => (flatListRefreshingRef.current = refreshing))

  const { role = '' } = useSelector(
    ({ auth: { user: { role = '' } } = {} }) => ({ role }),
    shallowEqual,
  )

  useEffect(() => {
    onFetchRestaurantsList({ pageNo, pageSize })
  }, [pageNo])

  useEffect(() => {
    if (!props?.loading && flatListRefreshingRef.current) {
      setRefreshing(false)
    }
  }, [props?.loading])

  useEffect(() => {
    onFetchRestaurantsList({ pageNo, pageSize })

    if (role === ROLE.OWNER) {
      navigation?.setOptions({
        headerRight: () => (
          <FormButton
            title={Strings.createRestaurant}
            onPress={() => props?.navigation?.navigate('CreateRestaurant')}
          />
        ),
      })
    }
  }, [])

  function onRefresh () {
    setRefreshing(true)
    if (PAGINATION_DEFAULTS.PAGE === pageNo) {
      onFetchRestaurantsList({ pageNo, pageSize })

      return
    }

    setPageNo(PAGINATION_DEFAULTS.PAGE)
  }

  function onPressDeleteItem (item) {
    setRestaurantId(item?._id)
    setTimeout(() => setIsDeleteModal(true), 500)
  }

  function onPressEdit (item) {
    props?.navigation?.navigate({
      name: 'CreateRestaurant',
      params: {restDetails: item, isEdit: true},
    })
  }

  function onDeleteConfirm () {
    closeModal()
    onDeleteRestaurant({ _id: restaurantId })
  }

  function onCLickItem (item) {
    return props?.navigation?.navigate({
      name: 'RestaurantDetails',
      params: { restaurantId: item?._id },
    })
  }

  function closeModal () {
    setRestaurantId('')
    setIsDeleteModal(false)
    printLogs('close')
  }

  function onEndReached () {
    if (props?.isRemaining && !props.loading) {
      setPageNo(prevState => prevState + 1)
    }
  }

  const onSwipeableOpen = (ref) => {
    if (openedSwipeableRef.current !== ref) {
      openedSwipeableRef.current?.close()
    }
    openedSwipeableRef.current = ref
  }

  function renderListItem ({ item, index }) {
    const { image, name, description, averageRating = 3 } = item || {}

    return (
      <SwipeableButton
        activeOpacity={0.6}
        onSwipeableOpen={onSwipeableOpen}
        onPressDelete={() => onPressDeleteItem(item)}
        onPressEdit={()=>onPressEdit(item)}
      >
        <TouchableOpacity activeOpacity={0.6} onPress={() => onCLickItem(item)}>
          <ListItem key={String(item?._id ?? index)} bottomDivider containerStyle={{ padding: 0 }}>
            <Avatar
              containerStyle={{ width: 120, height: 120 }}
              source={image ? { uri: image } : Images.restaurantPlaceholder}
            />
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
              <ListItem.Subtitle>{description.slice(0, 50)}...</ListItem.Subtitle>
            </ListItem.Content>
            <Rating imageSize={15} readonly startingValue={averageRating}/>
            <ListItem.Chevron/>
          </ListItem>
          <LoadingIndicator
            loading={item?._id === restaurantId && deletingRestaurant}
          />
        </TouchableOpacity>
      </SwipeableButton>
    )
  }

  return (
    <>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={item => String(item?._id)}
        extraData={props}
        data={data}
        renderItem={renderListItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
      <ConfirmationModal
        closeModal={closeModal}
        onPressDone={onDeleteConfirm}
        onPressCancel={closeModal}
        isVisible={isDeleteModal}
        header={Strings.deleteRestaurantTitle}
        subHeader={Strings.deleteRestaurantMessage}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(AuthActions.logout()),
  onFetchRestaurantsList: data => dispatch(RestActions.restaurantsList(data)),
  onDeleteRestaurant: data => dispatch(RestActions.deleteRestaurant(data)),
})

const mapStateToProps = ({
  restaurants: {
    restaurantsList = [],
    deletingRestaurant = false,
    isResRemaining: isRemaining = false,
    loading = false,
  } = {},
}) => ({
  data: restaurantsList,
  deletingRestaurant,
  isRemaining,
  loading,
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
