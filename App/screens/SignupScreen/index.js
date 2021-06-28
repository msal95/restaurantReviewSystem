import React, {useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';

import styles from './styles';
import InputFormField from '../../Components/InputFormField';
import FormButton from '../../Components/Button';
import {Strings} from '../../Themes/Strings';
import ImageCropPicker from '../../Components/ImageCropPicker';
import {checkCameraPermission} from '../../Lib/utils';
import {GENDER, IMAGE_OPTIONS} from '../../Lib/constants';
import SignUpActions from '../../Redux/AuthRedux';

function SignupScreen(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gender, setGender] = useState('MALE');
  const [password, setPassword] = useState('');
  const [role, selectedRole] = useState('Regular User');

  const passwordRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  async function uploadImage() {
    await checkCameraPermission(() => {
      ImagePicker.openCamera(IMAGE_OPTIONS).then(imageData => {
        console.log(imageData);
      });
    });
  }

  function renderSignUpData() {
    const data = {
      firstName,
      lastName,
      gender,
      email,
      password,
      phoneNo,
      role,
    };
    props?.onSignUp(data);
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ImageCropPicker />
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
        <InputFormField
          placeholder={Strings.enterPassword}
          label={Strings.password}
          inputRef={passwordRef}
          selectedOption={password}
          onSelect={value => setPassword(value)}
          secureTextEntry
          returnKeyType={'done'}
        />
        <View style={styles.roleSelection}>
          <Text style={styles.roleText}>{Strings.selectRole}</Text>
          <RNPickerSelect
            placeholder={{label: 'Regular User', value: 'REGULAR'}}
            onValueChange={value => selectedRole(value)}
            items={[
              {label: 'Owner', value: 'OWNER'},
              {label: 'Admin', value: 'ADMIN'},
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
            labelStyle={{fontSize: 18, paddingHorizontal: 20}}
          />
        </View>
      </KeyboardAwareScrollView>
      <FormButton title={Strings.signUp} onPress={renderSignUpData} />

      <Text style={styles.msgText}>
        {Strings.alreadyHaveAccount}
        <Text
          style={styles.signUpText}
          onPress={() => props?.navigation?.navigate('Login')}>
          {Strings.login}
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const mapStateToProps = ({auth: {loading = false} = {}}) => ({loading});
const mapDispatchToProps = dispatch => ({
  onSignUp: data => dispatch(SignUpActions.signup(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
