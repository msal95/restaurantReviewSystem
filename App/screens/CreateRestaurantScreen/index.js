import React, { useRef, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './styles'
import InputFormField from '../../Components/InputFormField'
import FormButton from '../../Components/Button'
import { Strings } from '../../Themes/Strings'
import ImageCropPicker from '../../Components/ImageCropPicker'

export default function CreateRestaurantScreen (props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [establishedAt, setEstablishedAT] = useState('')

  const descriptionRef = useRef()
  const locationRef = useRef()

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ImageCropPicker/>
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
        />
        <InputFormField
          label={Strings.location}
          placeholder={Strings.enterLocation}
          selectedOption={location}
          inputRef={locationRef}
          onSelect={value => setLocation(value)}
          returnKeyType={'done'}
        />
        <View style={styles.roleSelection}>
          <Text style={styles.roleText}>{Strings.establishedAt} : </Text>
          <InputFormField
            label={Strings.establishedAt}
            placeholder={Strings.selectDate}
            selectedOption={establishedAt}
            onSelect={(date) => setEstablishedAT(date)}
            dateTime
          />
        </View>
      </KeyboardAwareScrollView>
      <FormButton title={Strings.addRestaurant} onPress={() => props?.navigation?.navigate('Home')}/>
    </SafeAreaView>
  )
}
