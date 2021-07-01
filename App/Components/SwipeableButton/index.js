import { Animated, Text, TouchableOpacity, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import React, { useRef } from 'react'

import { Colors, Metrics } from '../../Themes'
import styles from './styles'
import { Icon } from 'react-native-elements'

function SwipeableButton (props) {

  const swipeableRow = useRef(null)

  const { children, onSwipeableOpen = () => {}, onPressDelete, onPressEdit } = props || {}

  const renderRightAction = (text, color, xSlide, progress, image, onPressHandler, buttonStyle) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [xSlide, 0],
      extrapolate: 'clamp'
    })

    const pressHandler = () => {
      close()
      onPressHandler()
    }

    return (
      <Animated.View style={[styles.rectButtonContainer, { transform: [{ translateX: trans }] }]}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.rightAction, { backgroundColor: color }, buttonStyle]}
          onPress={pressHandler}>
          <Icon
            name={image}
            type="font-awesome-5"
            color={Colors.white}
            size={Metrics.doubleBaseMargin}
          />
          <Text style={[styles.textStyle]}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  const renderRightActions = (progress) => (
    <View style={{ width: 200, flexDirection: 'row' }}>
      {renderRightAction('Edit', Colors.blue, 100, progress, 'edit', onPressEdit)}
      {renderRightAction('Remove', Colors.fire, 100, progress, 'trash-alt', onPressDelete)}
    </View>
  )

  const onSwipeableWillOpen = () => {
    onSwipeableOpen(swipeableRow.current)
  }

  const close = () => {
    swipeableRow.current.close?.()
  }

  return (
    <Swipeable
      ref={swipeableRow}
      friction={1}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={onSwipeableWillOpen}
    >
      {children}
    </Swipeable>
  )
}

export default React.memo(SwipeableButton)
