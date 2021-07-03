import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Avatar, FAB, Icon, ListItem, Rating} from 'react-native-elements';
import {connect, shallowEqual, useSelector} from 'react-redux';
import moment from 'moment';

import {Strings} from '../../Themes/Strings';
import AuthActions from '../../Redux/AuthRedux';
import RestActions from '../../Redux/RestaurantRedux';
import {Colors, Images} from '../../Themes';
import LoadingIndicator from '../../Components/LoadingIndicator';
import ConfirmationModal from '../../Components/ConfirmationModal';
import {
  capitalize,
  FILTER,
  FILTER_VALUES,
  PAGINATION_DEFAULTS,
  ROLE,
} from '../../Lib/constants';
import SwipeableButton from '../../Components/SwipeableButton';
import {printLogs} from '../../Lib/utils';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomSheetModal from '../../Components/BottomSheetModal';
import RadioForm from 'react-native-simple-radio-button';
import {isEmpty} from 'ramda';
import ListEmptyComponent from '../../Components/ListEmptyComponent';
import ListFooterComponent from '../../Components/ListFooterComponent';

function HomeScreen(props) {
  const {
    onFetchRestaurantsList,
    navigation,
    data,
    deletingRestaurant,
    onDeleteRestaurant,
  } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [restaurantId, setRestaurantId] = useState('');
  const [filterKey, setFilterKey] = useState('');
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [pageNo, setPageNo] = useState(PAGINATION_DEFAULTS.PAGE);
  const [pageSize] = useState(PAGINATION_DEFAULTS.PAGE_SIZE);
  const flatListRefreshingRef = useRef();
  const openedSwipeableRef = useRef();

  useEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={toggleModal}
          style={styles.filterIconContainer}>
          <FontAwesome name="filter" size={25} color={Colors.white} />
          {!isEmpty(filterKey) && <View style={styles.filterIcon} />}
        </TouchableOpacity>
      ),
    });
  }, [filterKey]);

  useEffect(() => (flatListRefreshingRef.current = refreshing));

  useEffect(() => {
    onFetchRestaurantsList({pageNo, pageSize});
  }, []);

  const {role = ''} = useSelector(
    ({auth: {user: {role = ''}} = {}}) => ({role}),
    shallowEqual,
  );

  useEffect(() => {
    onFetchRestaurantsList({pageNo, pageSize});
  }, [pageNo]);

  useEffect(() => {
    if (!props?.loading && flatListRefreshingRef.current) {
      setRefreshing(false);
    }
  }, [props?.loading]);

  function toggleModal() {
    setModalVisible(prevState => !prevState);
  }

  function onChangeFilters(filter) {
    setModalVisible(false);
    setFilterKey(filter);
    onFetchRestaurantsList({pageNo: 0, pageSize, ...FILTER_VALUES?.[filter]});
  }

  function onClearFilters() {
    setModalVisible(false);
    setFilterKey('');
    onFetchRestaurantsList({pageNo: 0, pageSize});
  }

  function onRefresh() {
    setRefreshing(true);
    if (PAGINATION_DEFAULTS.PAGE === pageNo) {
      onFetchRestaurantsList({pageNo, pageSize});

      return;
    }

    setPageNo(PAGINATION_DEFAULTS.PAGE);
  }

  function createRestaurant() {
    props?.navigation?.navigate('CreateRestaurant');
  }

  function onPressDeleteItem(item) {
    setRestaurantId(item?._id);
    setTimeout(() => setIsDeleteModal(true), 500);
  }

  function onPressEdit(item) {
    props?.navigation?.navigate({
      name: 'CreateRestaurant',
      params: {restDetails: item, isEdit: true},
    });
  }

  function onDeleteConfirm() {
    closeModal();
    onDeleteRestaurant({_id: restaurantId});
  }

  function onCLickItem(item) {
    return props?.navigation?.navigate({
      name: 'RestaurantDetails',
      params: {restaurantId: item?._id},
    });
  }

  function closeModal() {
    setRestaurantId('');
    setIsDeleteModal(false);
    printLogs('close');
  }

  function onEndReached() {
    if (props?.isRemaining && !props.loading) {
      setPageNo(prevState => prevState + 1);
    }
  }

  const onSwipeableOpen = ref => {
    if (openedSwipeableRef.current !== ref) {
      openedSwipeableRef.current?.close();
    }
    openedSwipeableRef.current = ref;
  };

  function renderListItem({item, index}) {
    const {
      image,
      name,
      description,
      averageRating = 3,
      establishedAt,
    } = item || {};

    return (
      <SwipeableButton
        activeOpacity={0.8}
        onSwipeableOpen={onSwipeableOpen}
        onPressDelete={() => onPressDeleteItem(item)}
        onPressEdit={() => onPressEdit(item)}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => onCLickItem(item)}>
          <ListItem
            key={String(item?._id ?? index)}
            bottomDivider
            containerStyle={styles.container}>
            <Avatar
              containerStyle={styles.image}
              source={image ? {uri: image} : Images.restaurantPlaceholder}
            />

            <ListItem.Content style={styles.itemContainer}>
              <ListItem.Title style={styles.title} numberOfLines={1}>
                {capitalize(name)}
              </ListItem.Title>
              <ListItem.Subtitle numberOfLines={3}>
                {description}
              </ListItem.Subtitle>
              <View style={styles.itemsInfo}>
                <ListItem.Subtitle style={styles.infoDate}>
                  {establishedAt && (
                    <Text style={styles.infoDateText}>
                      {moment(establishedAt).format('LL')}
                    </Text>
                  )}
                </ListItem.Subtitle>
                <Rating
                  type="custom"
                  imageSize={15}
                  readonly
                  startingValue={averageRating}
                />
              </View>
            </ListItem.Content>

            <ListItem.Chevron iconStyle={styles.iconStyle} />
          </ListItem>
          <LoadingIndicator
            loading={item?._id === restaurantId && deletingRestaurant}
          />
        </TouchableOpacity>
      </SwipeableButton>
    );
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
        ListEmptyComponent={
          <ListEmptyComponent
            loading={props?.loading}
            message={Strings.noRestaurantFound}
          />
        }
        ListFooterComponent={
          <ListFooterComponent loading={props?.pageNo > 0 && props?.loading} />
        }
      />
      {role === ROLE.OWNER && (
        <FAB
          icon={() => <Icon name="add" color="white" />}
          color={Colors.blue}
          style={styles.addButton}
          onPress={createRestaurant}
        />
      )}
      <ConfirmationModal
        closeModal={closeModal}
        onPressDone={onDeleteConfirm}
        onPressCancel={closeModal}
        isVisible={isDeleteModal}
        header={Strings.deleteRestaurantTitle}
        subHeader={Strings.deleteRestaurantMessage}
      />
      <BottomSheetModal
        isTopBar
        showClear={!isEmpty(filterKey)}
        onClear={onClearFilters}
        isVisible={isModalVisible}
        isHeader
        headerText={Strings.applyFilters}
        closeModal={toggleModal}>
        <View style={styles.filtersButton}>
          <RadioForm
            radio_props={FILTER}
            formHorizontal={false}
            labelHorizontal
            onPress={onChangeFilters}
            labelStyle={styles.radioLabel}
            radioStyle={styles.radioBtn}
            initial={FILTER?.findIndex(item => item?.value === filterKey)}
          />
        </View>
      </BottomSheetModal>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(AuthActions.logout()),
  onFetchRestaurantsList: data => dispatch(RestActions.restaurantsList(data)),
  onDeleteRestaurant: data => dispatch(RestActions.deleteRestaurant(data)),
});

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
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
