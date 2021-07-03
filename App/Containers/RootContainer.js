import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'

// Styles
import styles from './Styles/RootContainerStyles'
import RootNavigation from '../Navigation/RootNavigation'
import { Colors } from '../Themes'
import ReduxPersist from '../Config/ReduxPersist'
import FlashMessage from 'react-native-flash-message'

class RootContainer extends Component {
  componentDidMount () {
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.blue}/>
        <RootNavigation/>
        <FlashMessage position="top"/>
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(null, mapDispatchToProps)(RootContainer)
