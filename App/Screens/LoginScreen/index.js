import React, {useRef} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Text as TextElement} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {Formik} from 'formik';

import styles from './styles';
import InputFormField from '../../Components/InputFormField';
import FormButton from '../../Components/Button';
import {Strings} from '../../Themes/Strings';
import LoginActions from '../../Redux/AuthRedux';
import {loginValidationSchema} from '../../Services/ValidationSchema/LoginValidationSchema';
import {errorMessage} from '../../Lib/utils';

function LoginScreen(props) {
  const passwordRef = useRef();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TextElement h3 style={styles.headingText}>
        {Strings.reviewRestaurants}
      </TextElement>

      <KeyboardAwareScrollView>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={props?.onLogin}>
          {({
            handleSubmit,
            values,
            errors,
            handleChange,
            touched,
            handleBlur,
          }) => (
            <View>
              <InputFormField
                label={Strings.email}
                placeholder={Strings.enterEmil}
                selectedOption={values?.email ?? ''}
                onSelect={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                onSubmitEditing={() => passwordRef?.current?.focus?.()}
                returnKeyType={'next'}
              />
              {errorMessage(errors.email, touched.email)}
              <InputFormField
                placeholder={Strings.enterPassword}
                label={Strings.password}
                inputRef={passwordRef}
                selectedOption={values?.password ?? ''}
                onSelect={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                returnKeyType={'done'}
              />
              {errorMessage(errors.password, touched.password)}
              <FormButton
                title={Strings.login}
                onPress={handleSubmit}
                loading={props?.loading}
              />
            </View>
          )}
        </Formik>
        <Text style={styles.msgText}>
          {Strings.dontHaveAccount}
          <Text
            style={styles.signUpText}
            onPress={() => props?.navigation?.navigate('SignUp')}>
            {Strings.signUp}
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = ({auth: {loading = false} = {}}) => ({loading});
const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch(LoginActions.login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
