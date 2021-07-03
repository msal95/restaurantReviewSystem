import React, { useEffect, useRef, useState } from 'react'
import { Platform, SafeAreaView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from 'react-native-picker-select'
import { connect } from 'react-redux'
import RadioForm from 'react-native-simple-radio-button'
import { Formik } from 'formik'
import { useKeyboard } from '@react-native-community/hooks'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import styles from './styles'
import InputFormField from '../../Components/InputFormField'
import { Strings } from '../../Themes/Strings'
import ImageCropPicker from '../../Components/ImageCropPicker'
import { capitalize, GENDER, ROLE } from '../../Lib/constants'
import SignUpActions from '../../Redux/AuthRedux'
import { signUpValidationSchema } from '../../Services/ValidationSchema/SignUpValidationSchema'
import FormButton from '../../Components/Button'
import { errorMessage } from '../../Lib/utils'
import { editProfileValidationSchema } from '../../Services/ValidationSchema/EditProfileValidationSchema'

function SignupScreen (props) {
  const { keyboardShown, keyboardHeight } = useKeyboard()
  const {
    onSignUp,
    onEditProfile,
    navigation,
    onEditOtherUser,
    route,
    loading,
    user = {},
  } = props || {}

  const { isEditing = false, isSelf, otherUser = {} } = route?.params || {}

  const userInfo = isEditing ? (isSelf ? user : otherUser) : {}

  const [file, setImageSource] = useState({ path: userInfo?.picture })

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? Strings.editProfile : Strings.signUp,
    })
  }, [])

  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()

  function onPressSignUp (values) {
    const data = {
      ...values,
      _id: userInfo?._id,
    }

    if (file?.mime) {
      data.file = {
        uri: file?.path,
        type: file?.mime,
        name: file?.filename || 'profile image',
      }
    }

    if (isEditing && !isSelf) {
      onEditOtherUser({ _id: userInfo?._id, ...data })
    } else if (isEditing) {
      onEditProfile(data)
    } else {
      onSignUp(data)
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Formik
        validationSchema={
          isEditing ? editProfileValidationSchema : signUpValidationSchema
        }
        initialValues={{
          firstName: userInfo?.firstName ?? '',
          lastName: userInfo?.lastName ?? '',
          email: userInfo?.email ?? '',
          phoneNo: userInfo?.phoneNo ?? '',
          password: '',
          confirmPassword: '',
          gender: user?.gender ?? '',
          role: user?.role ?? ROLE.REGULAR,
        }}
        onSubmit={onPressSignUp}>
        {({
          handleSubmit,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <ImageCropPicker
                onSelectImage={param => setImageSource(param)}
                imgSrc={file}
              />
              <InputFormField
                label={Strings.firstName}
                placeholder={Strings.enterFirstName}
                selectedOption={values?.firstName ?? ''}
                onSelect={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                onSubmitEditing={() => lastNameRef?.current?.focus?.()}
                returnKeyType={'next'}
              />
              {errorMessage(errors?.firstName, touched?.firstName)}

              <InputFormField
                label={Strings.lastName}
                placeholder={Strings.enterLastName}
                selectedOption={values?.lastName ?? ''}
                onSelect={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                inputRef={lastNameRef}
                onSubmitEditing={() => phoneRef?.current?.focus?.()}
                returnKeyType={'next'}
              />
              {errorMessage(errors?.lastName, touched?.lastName)}

              <InputFormField
                label={Strings.phoneNum}
                placeholder={Strings.enterPhoneNum}
                selectedOption={values?.phoneNo ?? ''}
                onSelect={handleChange('phoneNo')}
                onBlur={handleBlur('phoneNo')}
                inputRef={phoneRef}
                keyboardType="phone-pad"
                onSubmitEditing={() => emailRef?.current?.focus?.()}
                returnKeyType={'next'}
              />
              {errorMessage(errors?.phoneNo, touched?.phoneNo)}

              <InputFormField
                label={Strings.email}
                placeholder={Strings.enterEmil}
                selectedOption={values?.email ?? ''}
                onSelect={handleChange('email')}
                onBlur={handleBlur('email')}
                inputRef={emailRef}
                keyboardType="email-address"
                onSubmitEditing={() => passwordRef?.current?.focus?.()}
                returnKeyType={'next'}
              />
              {errorMessage(errors?.email, touched?.email)}

              {!isEditing && (
                <>
                  <InputFormField
                    placeholder={Strings.enterPassword}
                    label={Strings.password}
                    selectedOption={values?.password ?? ''}
                    onSelect={handleChange('password')}
                    onBlur={handleBlur('password')}
                    inputRef={passwordRef}
                    secureTextEntry
                    returnKeyType={'done'}
                  />
                  {errorMessage(errors?.password, touched?.password)}
                  <InputFormField
                    placeholder={Strings.confirmPassword}
                    label={Strings.confirmPassword}
                    selectedOption={values?.confirmPassword ?? ''}
                    onSelect={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    inputRef={confirmPasswordRef}
                    secureTextEntry
                    returnKeyType={'done'}
                  />
                  {errorMessage(
                    errors?.confirmPassword,
                    touched?.confirmPassword,
                  )}
                </>
              )}

              {!isEditing && (
                <View style={styles.roleSelection}>
                  <Text style={styles.roleText}>{Strings.selectRole}</Text>
                  <RNPickerSelect
                    placeholder={{
                      label: capitalize(ROLE.REGULAR),
                      value: ROLE.REGULAR,
                    }}
                    onValueChange={handleChange('role')}
                    items={[
                      { label: capitalize(ROLE.OWNER), value: ROLE.OWNER },
                      { label: capitalize(ROLE.ADMIN), value: ROLE.ADMIN },
                    ]}
                    value={values.role}>
                    <Text style={styles.selectedOpt}>{values.role}</Text>
                  </RNPickerSelect>
                  {errorMessage(errors?.role, touched?.role)}
                </View>
              )}

              <View style={styles.roleSelection}>
                <Text style={styles.roleText}>{Strings.selectGender}</Text>
                <View style={styles.errorMessage}>
                  <RadioForm
                    radio_props={GENDER}
                    initial={
                      isEditing
                        ? user?.gender === GENDER[0]?.value
                        ? 0
                        : 1
                        : -1
                    }
                    formHorizontal={true}
                    labelHorizontal={true}
                    onPress={handleChange('gender')}
                    labelStyle={styles.radioBtn}
                  />
                </View>
                {errorMessage(errors?.gender, touched?.gender)}
              </View>
            </KeyboardAwareScrollView>

            <FormButton
              title={isEditing ? Strings.save : Strings.signUp}
              onPress={handleSubmit}
              loading={loading}
              buttonContainer={{
                ...Platform.select({
                  ios: {
                    marginBottom: keyboardShown
                      ? keyboardHeight - getBottomSpace() + 10
                      : 0,
                  },
                }),
              }}
            />
          </>
        )}
      </Formik>
      {!isEditing && (
        <Text style={styles.msgText}>
          {Strings.alreadyHaveAccount}
          <Text
            style={styles.signUpText}
            onPress={() => props?.navigation?.navigate('Login')}>
            {Strings.login}
          </Text>
        </Text>
      )}
    </SafeAreaView>
  )
}

const mapStateToProps = ({ auth: { loading = false, user = {} } = {} }) => ({
  loading,
  user,
})
const mapDispatchToProps = dispatch => ({
  onSignUp: data => dispatch(SignUpActions.signup(data)),
  onEditProfile: data => dispatch(SignUpActions.editProfile(data)),
  onEditOtherUser: data => dispatch(SignUpActions.editOtherUser(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
