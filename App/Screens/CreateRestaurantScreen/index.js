import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';

import styles from './styles';
import InputFormField from '../../Components/InputFormField';
import FormButton from '../../Components/Button';
import {Strings} from '../../Themes/Strings';
import ImageCropPicker from '../../Components/ImageCropPicker';
import RestActions from '../../Redux/RestaurantRedux';

function CreateRestaurantScreen(props) {
  const {restDetails = {}, isEdit = false} = props?.route?.params || {};

  useEffect(() => {
    if (isEdit) {
      props?.navigation?.setOptions({
        headerTitle: Strings.updateRestaurant,
      });
    }
  }, []);

  const {
    name: nameDB = '',
    description: descriptionDB = '',
    location: locationDB = '',
    establishedAt: establishedAtDB = '',
    image: fileDB = '',
  } = isEdit ? restDetails : {};

  const [name, setName] = useState(nameDB);
  const [description, setDescription] = useState(descriptionDB);
  const [location, setLocation] = useState(locationDB);
  const [establishedAt, setEstablishedAT] = useState(establishedAtDB);
  const [file, setImageSource] = useState({path: fileDB});

  const descriptionRef = useRef();
  const locationRef = useRef();

  function createRestaurant() {
    const data = {
      name,
      description,
      location,
      establishedAt,
    };
    if (file?.mime) {
      data.file = {
        uri: file?.path,
        type: file?.mime,
        name: file?.filename || 'profile image',
      };
    }
    if (isEdit) {
      props?.onUpdateRestaurant(data, restDetails?._id);
    } else {
      props?.onCreateRestaurant(data);
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ImageCropPicker
          onSelectImage={param => setImageSource(param)}
          imgSrc={file}
        />
        <InputFormField
          label={Strings.name}
          placeholder={Strings.enterRestaurantName}
          selectedOption={name}
          onSelect={value => setName(value)}
          onSubmitEditing={() => descriptionRef?.current?.focus?.()}
          returnKeyType={'next'}
        />
        <InputFormField
          label={Strings.description}
          placeholder={Strings.enterDescription}
          selectedOption={description}
          inputRef={descriptionRef}
          onSelect={value => setDescription(value)}
          onSubmitEditing={() => locationRef?.current?.focus?.()}
          returnKeyType={'next'}
          multiline
        />
        <InputFormField
          label={Strings.location}
          placeholder={Strings.enterLocation}
          selectedOption={location}
          inputRef={locationRef}
          onSelect={value => setLocation(value)}
          returnKeyType={'done'}
        />
        <View style={styles.establishedDate}>
          <Text style={styles.dateTitle}>{Strings.establishedAt} : </Text>
          <InputFormField
            label={Strings.establishedAt}
            placeholder={Strings.selectDate}
            selectedOption={establishedAt}
            onSelect={date => setEstablishedAT(date)}
            dateTime
          />
        </View>
      </KeyboardAwareScrollView>
      <FormButton
        title={isEdit ? Strings.updateRestaurant : Strings.addRestaurant}
        onPress={createRestaurant}
        loading={props?.loading}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = ({auth: {loading = false} = {}}) => ({loading});
const mapDispatchToProps = dispatch => ({
  onCreateRestaurant: data => dispatch(RestActions.createRestaurant(data)),
  onUpdateRestaurant: (data, restaurantId) =>
    dispatch(RestActions.updateRestaurant(data, restaurantId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateRestaurantScreen);
