import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Animated,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Modal,
} from 'react-native';
import StatusBar from '@react-native-community/status-bar';
import { withTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import StandardHeader from '../../components/standardHeader/StandardHeader';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';

import StandardHeader from '../../components/standardHeader/StandardHeader';

import { STATUSBAR_HEIGHT } from '../../components/standardHeader/style/StandardHeader';

import Colors from '../../style/Colors';
import AchievementSection from './AchievementSection';
import DescriptionSection from './DescriptionSection';
import PersonalInfoSection from './PersonalInfoSection';
import styles, {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  HEADER_SCROLL_DISTANCE,
} from './style/Profile';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);
    this.textHeight = Platform.OS === 'android' ? 27 : 22;
    this.state = {
      modalVisible: false,
      image: this.props.profile.avatar.full,
    };
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };

  isOwnProfilePage = () => {
    return this.props.pk === this.props.profile.pk;
  };

  getAppbar = () => {
    const headerHeight = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const imageOpacity = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    const textSize = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [30, 30, Platform.OS === 'android' ? 20 : 18],
      extrapolate: 'clamp',
    });

    const textPosLeft = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [20, 20, Platform.OS === 'android' ? 76 : 20],
      extrapolate: 'clamp',
    });

    const textPosBottom = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [16, 16, (HEADER_MIN_HEIGHT - this.textHeight - STATUSBAR_HEIGHT) / 2],
      extrapolate: 'clamp',
    });

    let textStyle = {
      fontSize: textSize,
      bottom: textPosBottom,
    };
    let appBarBorderStyle = {};
    if (Platform.OS === 'android') {
      textStyle = {
        ...textStyle,
        left: textPosLeft,
      };
    } else {
      textStyle = {
        ...textStyle,
        textAlign: 'center',
      };

      const appBarBorder = this.props.success ? this.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
      }) : (HEADER_MIN_HEIGHT - 24) / 2;

      appBarBorderStyle = {
        borderBottomWidth: appBarBorder,
      };
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => this.setModalVisible(true)}
      >
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.View
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
          >
            <ImageBackground
              source={{ uri: this.state.image }}
              style={styles.backgroundImage}
              resizeMode="cover"
            >
              <LinearGradient colors={['#55000000', '#000000']} style={styles.overlayGradient}/>
            </ImageBackground>
          </Animated.View>
          <Animated.View style={[styles.appBar, appBarBorderStyle]}>
            <TouchableOpacity
              onPress={this.props.goBack}
            >
              <Icon
                name="arrow-back"
                style={styles.icon}
                size={24}
              />
            </TouchableOpacity>
            <Animated.Text
              style={[styles.title, textStyle]}
            >
              {this.props.profile.display_name}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  handleEditPress = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;

        this.setState({
          image: source,
        });
      }
    });
  };

  render() {
    const {
      hasLoaded, profile, t, openUrl, success,
    } = this.props;

    if (!hasLoaded) {
      return (
        <View style={styles.container}>
          <StandardHeader/>
          <LoadingScreen/>
        </View>
      );
    } if (!success) {
      return (
        <View style={styles.container}>
          <StandardHeader />
          <ErrorScreen message={t('Sorry! We couldn\'t load any data.')} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Colors.semiTransparent}
          barStyle="light-content"
          translucent
          animated
        />
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          animationType={'fade'}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
              width: '100%',
              height: '100%'
            }}
          >
            <Image
              source={{ uri: this.state.image }}
              style={{ width: '90%', height: '60%' }}
              resizeMode={'contain'}
            />
            <View
              style={{ justifyContent: 'space-around', flexDirection: 'row' }}
            >
              {this.isOwnProfilePage() && (
                <Icon
                  name="edit"
                  style={{ flex: 1, fontSize: 24, color: 'white', textAlign: 'center' }}
                  onPress={this.handleEditPress}
                />
              )}
              <Icon
                name="cancel"
                style={{ flex: 1, fontSize: 24, color: 'white', textAlign: 'center' }}
                onPress={() => this.setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
        <ScrollView
          style={styles.container}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }])}
        >
          <View style={styles.content}>
            <DescriptionSection profile={profile} />
            <PersonalInfoSection profile={profile} openUrl={openUrl} />
            <AchievementSection profile={profile} type="achievements" />
            <AchievementSection profile={profile} type="societies" />
          </View>
        </ScrollView>
        {this.getAppbar()}
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  pk: PropTypes.number.isRequired,
  profile: PropTypes.shape({
    pk: PropTypes.number.isRequired,
    display_name: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      full: PropTypes.string.isRequired,
      large: PropTypes.string.isRequired,
      medium: PropTypes.string.isRequired,
      small: PropTypes.string.isRequired,
    }).isRequired,
    profile_description: PropTypes.string,
    birthday: PropTypes.string,
    starting_year: PropTypes.number,
    programme: PropTypes.string,
    website: PropTypes.string,
    membership_type: PropTypes.string,
    achievements: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      earliest: PropTypes.string,
      periods: PropTypes.arrayOf(PropTypes.shape({
        chair: PropTypes.bool.isRequired,
        until: PropTypes.string,
        since: PropTypes.string.isRequired,
        role: PropTypes.string,
      })),
    })).isRequired,
    societies: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      earliest: PropTypes.string,
      periods: PropTypes.arrayOf(PropTypes.shape({
        chair: PropTypes.bool.isRequired,
        until: PropTypes.string,
        since: PropTypes.string.isRequired,
        role: PropTypes.string,
      })),
    })).isRequired,
  }).isRequired,
  success: PropTypes.bool.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  openUrl: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default withTranslation('ui/screens/profile/ProfileScreen')(ProfileScreen);
