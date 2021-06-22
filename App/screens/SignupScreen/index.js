import React, { useRef, useState } from 'react'
import { Text, SafeAreaView } from 'react-native'
import styles from './styles'
import { Avatar, Text as TextElement } from 'react-native-elements'
import InputFormField from '../../Components/InputFormField'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FormButton from '../../Components/Button'
import { Strings } from '../../Themes/Strings'

export default function SignupScreen (props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')

  const passwordRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Avatar
          rounded
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
          size="large"
        />
        <InputFormField
          label={Strings.firstName}
          placeholder="Enter First Name"
          selectedOption={firstName}
          onSelect={value => setFirstName(value)}
          onSubmitEditing={() => lastNameRef?.current?.focus?.()}
          returnKeyType={'next'}
        />
        <InputFormField
          label={Strings.lastName}
          placeholder="Enter Last Name"
          selectedOption={lastName}
          inputRef={lastNameRef}
          onSelect={value => setLastName(value)}
          onSubmitEditing={() => emailRef?.current?.focus?.()}
          returnKeyType={'next'}
        />
        <InputFormField
          label={Strings.email}
          placeholder="Enter Email"
          selectedOption={email}
          inputRef={emailRef}
          onSelect={value => setEmail(value)}
          keyboardType="email-address"
          onSubmitEditing={() => phoneRef?.current?.focus?.()}
          returnKeyType={'next'}
        />
        <InputFormField
          label={Strings.phoneNum}
          placeholder="Enter Phone Number"
          selectedOption={phone}
          inputRef={phoneRef}
          onSelect={value => setPhone(value)}
          keyboardType="phone-pad"
          onSubmitEditing={() => passwordRef?.current?.focus?.()}
          returnKeyType={'next'}
        />
        <InputFormField
          placeholder="Enter Password"
          label={Strings.password}
          inputRef={passwordRef}
          selectedOption={password}
          onSelect={value => setPassword(value)}
          secureTextEntry
          returnKeyType={'done'}
        />


      </KeyboardAwareScrollView>
      <FormButton title={Strings.signUp} onPress={() => props?.navigation?.navigate('Home')}/>

      <Text style={styles.msgText}>Don't have account? <Text style={styles.signUpText}
                                                             onPress={() => props?.navigation?.navigate('Login')}>{Strings.login}</Text></Text>
    </SafeAreaView>
  )
}
