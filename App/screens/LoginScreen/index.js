import React, { useRef, useState } from 'react'
import { Text, SafeAreaView } from 'react-native'
import { Text as TextElement } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './styles'
import InputFormField from '../../Components/InputFormField'
import FormButton from '../../Components/Button'
import { Strings } from '../../Themes/Strings'

export default function LoginScreen (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const passwordRef = useRef()

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TextElement h3 style={styles.headingText}>{Strings.reviewRestaurants}</TextElement>
      <KeyboardAwareScrollView>
        <InputFormField
          label={Strings.email}
          placeholder="Enter Email"
          selectedOption={email}
          onSelect={value => setEmail(value)}
          keyboardType="email-address"
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

        <FormButton title={Strings.login} onPress={() => props?.navigation?.navigate('Home')}/>

        <Text style={styles.msgText}>{Strings.dontHaveAccount}<Text style={styles.signUpText}
                                                                    onPress={() => props?.navigation?.navigate('SignUp')}>{Strings.signUp}</Text></Text>
      </KeyboardAwareScrollView>

    </SafeAreaView>
  )
}
