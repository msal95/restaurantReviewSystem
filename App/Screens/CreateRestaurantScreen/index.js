import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {Formik} from 'formik';

import styles from './styles';
import InputFormField from '../../Components/InputFormField';
import FormButton from '../../Components/Button';
import {Strings} from '../../Themes/Strings';
import ImageCropPicker from '../../Components/ImageCropPicker';
import RestActions from '../../Redux/RestaurantRedux';
import {errorMessage} from '../../Lib/utils';
import {createRestaurantValidationSchema} from '../../Services/ValidationSchema/CreateRestaurantValidationSchema';

function CreateRestaurantScreen(props) {
  const {restDetails = {}, isEdit = false} = props?.route?.params || {};

  useEffect(() => {
    if (isEdit) {
      props?.navigation?.setOptions({
        headerTitle: Strings.updateRestaurant,
      });
    }
  }, []);

  const restaurantInfo = isEdit ? restDetails : {};

  const [file, setImageSource] = useState({path: restaurantInfo?.image});

  const descriptionRef = useRef();
  const locationRef = useRef();

  function createRestaurant(values) {
    const data = {
      ...values,
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
      <Formik
        validationSchema={createRestaurantValidationSchema}
        initialValues={{
          name: restaurantInfo?.name ?? '',
          description: restaurantInfo?.description ?? '',
          location: restaurantInfo?.location ?? '',
          establishedAt: restaurantInfo?.establishedAt ?? '',
        }}
        onSubmit={createRestaurant}>
        {({
          handleSubmit,
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
        }) => (
          <View style={styles.container}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <ImageCropPicker
                onSelectImage={param => setImageSource(param)}
                imgSrc={file}
              />
              <InputFormField
                label={Strings.name}
                placeholder={Strings.enterRestaurantName}
                selectedOption={values?.name ?? ''}
                onSelect={handleChange('name')}
                onBlur={handleBlur('name')}
                onSubmitEditing={() => descriptionRef?.current?.focus?.()}
                returnKeyType={'next'}
              />
              {errorMessage(errors?.name, touched.name)}

              <InputFormField
                label={Strings.description}
                placeholder={Strings.enterDescription}
                selectedOption={values?.description ?? ''}
                onSelect={handleChange('description')}
                onBlur={handleBlur('description')}
                inputRef={descriptionRef}
                onSubmitEditing={() => locationRef?.current?.focus?.()}
                returnKeyType={'next'}
                multiline
              />
              {errorMessage(errors?.description, touched.description)}

              <InputFormField
                label={Strings.location}
                placeholder={Strings.enterLocation}
                selectedOption={values?.location ?? ''}
                onSelect={handleChange('location')}
                onBlur={handleBlur('location')}
                inputRef={locationRef}
                returnKeyType={'done'}
              />
              {errorMessage(errors?.location, touched.location)}

              <View style={styles.establishedDate}>
                <View>
                <Text style={styles.dateTitle}>{Strings.establishedAt} : </Text>
                  {errorMessage(errors?.establishedAt, touched.establishedAt, styles.dateError)}
                  </View>
                <InputFormField
                  label={Strings.establishedAt}
                  placeholder={Strings.selectDate}
                  selectedOption={values?.establishedAt ?? ''}
                  onSelect={handleChange('establishedAt')}
                  onBlur={handleBlur('establishedAt')}
                  dateTime
                />
              </View>
            </KeyboardAwareScrollView>
            <FormButton
              title={isEdit ? Strings.updateRestaurant : Strings.addRestaurant}
              onPress={handleSubmit}
              loading={props?.loading}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const mapStateToProps = ({restaurants: {loading = false} = {}}) => ({loading});
const mapDispatchToProps = dispatch => ({
  onCreateRestaurant: data => dispatch(RestActions.createRestaurant(data)),
  onUpdateRestaurant: (data, restaurantId) =>
    dispatch(RestActions.updateRestaurant(data, restaurantId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateRestaurantScreen);
