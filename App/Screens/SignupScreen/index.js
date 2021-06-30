import React, { useEffect, useRef, useState } from 'react'
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';

import styles from './styles';
import InputFormField from '../../Components/InputFormField';
import FormButton from '../../Components/Button';
import {Strings} from '../../Themes/Strings';
import ImageCropPicker from '../../Components/ImageCropPicker';
import { GENDER, ROLE } from '../../Lib/constants'
import SignUpActions from '../../Redux/AuthRedux';
import { printLogs } from '../../Lib/utils'

function SignupScreen(props) {

  const {
    onSignUp,
    onEditProfile,
    navigation,
    onEditOtherUser,
    route,
    loading,
    user={}
  } = props || {}

  const {isEditing =false, isSelf, otherUser={}} =  route?.params || {}

  const {
    firstName: firstNameDB='',
    lastName: lastNameDB='',
    email: emailDB='',
    phoneNo: phoneNoDB='',
    gender: genderDB='MALE',
    password: passwordDB='',
    role: roleDB='Regular User',
    picture,
    _id
  } = isEditing ? isSelf ? user : otherUser : {}

  const [firstName, setFirstName] = useState(firstNameDB);
  const [lastName, setLastName] = useState(lastNameDB);
  const [email, setEmail] = useState(emailDB);
  const [phoneNo, setPhoneNo] = useState(phoneNoDB);
  const [gender, setGender] = useState(genderDB);
  const [password, setPassword] = useState(passwordDB);
  const [role, selectedRole] = useState(roleDB);
  const [file, setImageSource] = useState({ path: picture });

  useEffect(()=>{
    navigation.setOptions({
      title : isEditing ? Strings.editProfile : Strings.signUp
    })
  }, [])

  const passwordRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  function onPressSignUp() {
    const data = {
      firstName,
      lastName,
      gender,
      email,
      password,
      phoneNo,
      role,
      _id
    };

    if(file?.mime){
      data.file = {uri: file?.path, type: file?.mime, name: file?.filename || 'profile image'}
    }

    if(isEditing && !isSelf) {
      onEditOtherUser({ _id, ...data })
    }else if(isEditing) {
      onEditProfile(data)
    }  else{
      onSignUp(data)
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
          label={Strings.firstName}
          placeholder={Strings.enterFirstName}
          selectedOption={firstName}
          onSelect={value => setFirstName(value)}
          onSubmitEditing={() => lastNameRef?.current?.focus?.()}
          returnKeyType={'next'}
        />
        <InputFormField
          label={Strings.lastName}
          placeholder={Strings.enterLastName}
          selectedOption={lastName}
          inputRef={lastNameRef}
          onSelect={value => setLastName(value)}
          onSubmitEditing={() => phoneRef?.current?.focus?.()}
          returnKeyType={'next'}
        />
        <InputFormField
          label={Strings.phoneNum}
          placeholder={Strings.enterPhoneNum}
          selectedOption={phoneNo}
          inputRef={phoneRef}
          onSelect={value => setPhoneNo(value)}
          keyboardType="phone-pad"
          onSubmitEditing={() => emailRef?.current?.focus?.()}
          returnKeyType={'next'}
        />
        <InputFormField
          label={Strings.email}
          placeholder={Strings.enterEmil}
          selectedOption={email}
          inputRef={emailRef}
          onSelect={value => setEmail(value)}
          keyboardType="email-address"
          onSubmitEditing={() => passwordRef?.current?.focus?.()}
          returnKeyType={'next'}
        />
        {!isEditing && (
        <InputFormField
          placeholder={Strings.enterPassword}
          label={Strings.password}
          inputRef={passwordRef}
          selectedOption={password}
          onSelect={value => setPassword(value)}
          secureTextEntry
          returnKeyType={'done'}
        />
        )}
        <View style={styles.roleSelection}>
          <Text style={styles.roleText}>{Strings.selectRole}</Text>
          <RNPickerSelect
            placeholder={{label: 'Regular User', value: ROLE.REGULAR}}
            onValueChange={value => selectedRole(value)}
            items={[
              {label: 'Owner', value: ROLE.OWNER},
              {label: 'Admin', value: ROLE.ADMIN},
            ]}
            value={role}>
            <Text style={styles.selectedOpt}>{role}</Text>
          </RNPickerSelect>
        </View>

        <View style={styles.roleSelection}>
          <Text style={styles.roleText}>{Strings.selectGender}</Text>
          <RadioForm
            radio_props={GENDER}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            onPress={value => setGender(value)}
            labelStyle={styles.radioBtn}
          />
        </View>
      </KeyboardAwareScrollView>
      <FormButton title={isEditing ? Strings.save : Strings.signUp} onPress={onPressSignUp} loading={loading}/>

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
  );
}

const mapStateToProps = ({auth: {loading = false, user={}} = {}}) => ({loading, user});
const mapDispatchToProps = dispatch => ({
  onSignUp: data => dispatch(SignUpActions.signup(data)),
  onEditProfile: data => dispatch(SignUpActions.editProfile(data)),
  onEditOtherUser: data => dispatch(SignUpActions.editOtherUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
