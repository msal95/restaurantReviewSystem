import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import AuthActions from '../../Redux/AuthRedux';
import {Avatar, Text as TextElement} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors, Images} from '../../Themes';
import FormButton from '../../Components/Button';
import {Strings} from '../../Themes/Strings';
import {ROLE} from '../../Lib/constants';

function ProfileScreen(props) {
  const {onGetUserProfile, user, route, navigation} = props || {};
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileInfoContainer}>
        <TextElement h3 style={styles.userTitle}>
          {fullName}
        </TextElement>
        <Text style={styles.userTitle}>{role}</Text>
        <View style={styles.userDetails}>
          <Text style={styles.userInfo}>
            <Entypo name="email" size={20} color={Colors.blue} /> {email}
          </Text>
          <Text style={styles.userInfo}>
            <Entypo name="phone" size={20} color={Colors.blue} /> {phoneNo}
          </Text>
          <Text style={styles.userInfo}>
            <FontAwesome name="user" size={20} color={Colors.blue} /> {gender}
          </Text>
        </View>
        {isSelf && (
          <FormButton
            title={Strings.logout}
            onPress={() => props?.onLogout()}
          />
        )}
      </View>
      <View style={styles.profileContainer}>
        <Avatar
          rounded
          size="xlarge"
          source={
            picture
              ? {
                  uri: picture,
                }
              : Images.userPlaceholder
          }
          containerStyle={styles.profileImage}
        />
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
