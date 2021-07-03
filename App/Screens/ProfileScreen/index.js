import React, {useEffect} from 'react';
import {
  ImageBackground,
  Linking,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {Avatar, Text as TextElement} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';

import styles from './styles';
import AuthActions from '../../Redux/AuthRedux';
import {Colors, Images} from '../../Themes';
import FormButton from '../../Components/Button';
import {Strings} from '../../Themes/Strings';
import {capitalize, ROLE} from '../../Lib/constants';

function ProfileScreen(props) {
  const {user, route, navigation} = props || {};
  const {user: otherUser, isSelf = true} = route?.params || {};

  const {
    fullName = '',
    role = '',
    gender = '',
    phoneNo = '',
    picture = '',
    email = '',
  } = (!isSelf ? otherUser : user) || {};

  useEffect(() => {
    (isSelf || user?.role === ROLE.ADMIN) &&
      navigation?.setOptions({
        headerRight: () => (
          <FormButton
            title={Strings.edit}
            onPress={() =>
              navigation.navigate('SignUp', {
                isEditing: true,
                isSelf,
                otherUser,
              })
            }
          />
        ),
      });
  }, []);

  function openDialPad() {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Images.cover} style={styles.image} />

      <Avatar
        rounded
        size="xlarge"
        source={picture ? {uri: picture} : Images.userPlaceholder}
        containerStyle={styles.profileImage}
      />

      <View style={styles.profileInfoContainer}>
        <TextElement h3 style={styles.userTitle}>
          {capitalize(fullName)}
        </TextElement>
        <Text style={styles.userTitle}>{capitalize(role)}</Text>

        <View style={styles.infoContainer}>
          <Entypo name="email" size={20} color={Colors.blue} />
          <Text style={styles.userInfo}>{email}</Text>
        </View>

        <TouchableOpacity
          onPress={openDialPad}
          activeOpacity={0.6}
          style={styles.infoContainer}>
          <Foundation
            name="telephone-accessible"
            size={20}
            color={Colors.blue}
          />
          <Text style={styles.userInfo}> {phoneNo}</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <FontAwesome name="user" size={20} color={Colors.blue} />
          <Text style={styles.userInfo}> {gender}</Text>
        </View>

        {isSelf && (
          <FormButton
            title={Strings.logout}
            onPress={() => props?.onLogout()}
            iconName="logout"
            buttonContainer={styles.buttonContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(AuthActions.logout()),
  onGetUserProfile: data => dispatch(AuthActions.userProfile(data)),
});

const mapStateToProps = ({auth: {user = {}} = {}}) => ({
  user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
