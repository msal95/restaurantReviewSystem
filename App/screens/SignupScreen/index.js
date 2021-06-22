import React, { useRef, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Avatar, CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './styles'
import InputFormField from '../../Components/InputFormField'
import FormButton from '../../Components/Button'
import { Strings } from '../../Themes/Strings'
import { Colors } from '../../Themes'
import { Dropdown } from '../../Components/Dropdown'
import ImageCropPicker from '../../Components/ImageCropPicker'
import { checkCameraPermission } from '../../Lib/utils'
import ImagePicker from 'react-native-image-crop-picker'
const IMAGE_OPTIONS = {
  width: 250,
  height: 250,
  cropping: true,
};

export default function SignupScreen (props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [genderMale, setGenderMale] = useState(false)
  const [genderFemale, setGenderFemale] = useState(false)
  const [password, setPassword] = useState('')
  const [imageSrc, setImageSource] = useState({});

  const passwordRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()

  async function uploadImage () {
    await checkCameraPermission(() => {
      ImagePicker.openCamera(IMAGE_OPTIONS).then(imageData => {
        console.log(imageData);
      });
    });
  }

  function onSelectGenderMale () {
    setGenderMale((prevState => !prevState))
    if(genderFemale){
      setGenderFemale(false)
    }
  }

  function onSelectGenderFemale () {
    setGenderFemale((prevState => !prevState))
    if(genderMale){
      setGenderMale(false)
    }
  }


  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ImageCropPicker/>
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
          onSubmitEditing={() => emailRef?.current?.focus?.()}
          returnKeyType={'next'}
        />
        <InputFormField
          label={Strings.phoneNum}
          placeholder={Strings.enterPhoneNum}
          selectedOption={phone}
          inputRef={phoneRef}
          onSelect={value => setPhone(value)}
          keyboardType="phone-pad"
          onSubmitEditing={() => passwordRef?.current?.focus?.()}
          returnKeyType={'next'}
        />
        <InputFormField
          label={Strings.email}
          placeholder={Strings.enterEmil}
          selectedOption={email}
          inputRef={emailRef}
          onSelect={value => setEmail(value)}
          keyboardType="email-address"
          onSubmitEditing={() => phoneRef?.current?.focus?.()}
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
          <Dropdown/>
        </View>

        <View style={styles.roleSelection}>
          <Text style={styles.roleText}>{Strings.selectGender}</Text>
          <View style={{ flexDirection: 'row', }}>
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title="Male"
              onPress={onSelectGenderMale}
              checked={genderMale}
              containerStyle={styles.radioButton}
            />
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title="Female"
              onPress={onSelectGenderFemale}
              checked={genderFemale}
              containerStyle={styles.radioButton}
            />
          </View>
        </View>

      </KeyboardAwareScrollView>
      <FormButton title={Strings.signUp} onPress={() => props?.navigation?.navigate('Home')}/>

      <Text style={styles.msgText}>{Strings.alreadyHaveAccount}
        <Text style={styles.signUpText}
              onPress={() => props?.navigation?.navigate('Login')}>{Strings.login}</Text></Text>

    </SafeAreaView>
  )
}
