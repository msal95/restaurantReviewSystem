import React, { useRef, useState } from 'react'
import { Text, SafeAreaView } from 'react-native'
import { Text as TextElement } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'

import styles from './styles'
import InputFormField from '../../Components/InputFormField'
import FormButton from '../../Components/Button'
import { Strings } from '../../Themes/Strings'
import LoginActions from '../../Redux/AuthRedux'


function LoginScreen (props) {
  const [email, setEmail] = useState(__DEV__ ? 'aali@gmail.com' : '')
  const [password, setPassword] = useState('asdfghjkl')

  const passwordRef = useRef()

  function renderLoginData(){
    const data= {
      email,
      password
    }
    props?.onLogin(data)
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TextElement h3 style={styles.headingText}>{Strings.reviewRestaurants}</TextElement>
      <KeyboardAwareScrollView>
        <InputFormField
          label={Strings.email}
          placeholder={Strings.enterEmil}
          selectedOption={email}
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

        <FormButton title={Strings.login} onPress={renderLoginData}/>

        <Text style={styles.msgText}>{Strings.dontHaveAccount}
          <Text style={styles.signUpText}
                onPress={() => props?.navigation?.navigate('SignUp')}>{Strings.signUp}</Text></Text>
      </KeyboardAwareScrollView>

    </SafeAreaView>
  )
}
const mapStateToProps = ({auth: {loading = false} = {}}) => ({loading});
const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch(LoginActions.login(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
