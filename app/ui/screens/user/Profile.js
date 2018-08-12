import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';

import StandardHeader from '../../components/standardHeader/StandardHeader';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';

import Colors from '../../style/Colors';

import { STATUSBAR_HEIGHT } from '../../components/standardHeader/style/StandardHeader';
import styles, {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  HEADER_SCROLL_DISTANCE,
} from './style/Profile';
import CardSection from '../../components/cardSection/CardSection';

const getDescription = (profile, t) => (
  <CardSection
    sectionHeader={`${t('About')} ${profile.display_name}`}
  >
    <Text
      style={[
        styles.data,
        styles.item,
        styles.profileText,
        !profile.profile_description && styles.italics]}
    >
      {profile.profile_description || t('This member has not written a description yet.')}
    </Text>
  </CardSection>
);

const getPersonalInfo = (profile, t) => {
  const profileInfo = {
    starting_year: {
      title: t('Cohort'),
      display: x => x,
    },
    programme: {
      title: t('Study programme'),
      display: x => (x === 'computingscience' ? t('Computing science') : t('Information sciences')),
    },
    website: {
      title: t('Website'),
      display: x => x,
    },
    birthday: {
      title: t('Birthday'),
      display: x => Moment(x).format('D MMMM YYYY'),
    },
  };

  const profileData = Object.keys(profileInfo).map((key) => {
    if (profile[key]) {
      return {
        title: profileInfo[key].title,
        value: profileInfo[key].display(profile[key]),
      };
    }
    return null;
  }).filter(n => n);

  if (profileData) {
    return (
      <CardSection sectionHeader={t('Personal information')}>
        {profileData.map((item, i) => (
          <View style={[styles.item, i !== 0 && styles.borderTop]} key={item.title}>
            <Text style={styles.description}>
              {item.title}
            </Text>
            <Text
              style={item.title === 'Website' ? [styles.data, styles.url] : styles.data}
              onPress={item.title === 'Website' ? () => Linking.openURL(`${item.value}`) : null}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </CardSection>
    );
  }
  return <View />;
};

const getAchievements = (profile, t) => {
  if (profile.achievements.length) {
    return (
      <CardSection
        sectionHeader={t('Achievements for Thalia')}
      >
        {profile.achievements.map((achievement, i) => (
          <View style={[styles.item, i !== 0 && styles.borderTop]} key={achievement.name}>
            <Text style={styles.description}>
              {achievement.name}
            </Text>
            {achievement.periods && achievement.periods.map((period) => {
              let start = Moment(period.since);
              start = start.isSame(Moment([1970, 1, 1]), 'year') ? '?' : start.format('D MMMM YYYY');
              const end = period.until ? Moment(period.until).format('D MMMM YYYY') : t('today');

              let text = '';
              if (period.role) {
                text = `${period.role}: `;
              } else if (period.chair) {
                text = `${t('Chair')}: `;
              }
              text += `${start} - ${end}`;

              return (
                <Text style={styles.data} key={period.since}>
                  {text}
                </Text>
              );
            })}
          </View>
        ))}
      </CardSection>
    );
  }
  return <View />;
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);
    this.textHeight = Platform.OS === 'android' ? 27 : 22;
  }

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
    let appBarBorderStyle = {
    };
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
            source={{ uri: this.props.profile.avatar.full }}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <LinearGradient colors={['#55000000', '#000000']} style={styles.overlayGradient} />
          </ImageBackground>
        </Animated.View>
        <Animated.View style={[styles.appBar, appBarBorderStyle]}>
          <TouchableOpacity
            onPress={this.props.navigation.goBack}
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
    );
  };

  render() {
    if (!this.props.hasLoaded) {
      return (
        <View style={styles.container}>
          <StandardHeader />
          <LoadingScreen />
        </View>
      );
    } if (!this.props.success) {
      return (
        <View style={styles.container}>
          <StandardHeader />
          <ErrorScreen message={this.props.t('Sorry! We couldn\'t load any data.')} />
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
        <ScrollView
          style={styles.container}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }])}
        >
          <View style={styles.content}>
            {getDescription(this.props.profile, this.props.t)}
            {getPersonalInfo(this.props.profile, this.props.t)}
            {getAchievements(this.props.profile, this.props.t)}
          </View>
        </ScrollView>
        {this.getAppbar()}
      </View>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    pk: PropTypes.number.isRequired,
    display_name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
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
  }).isRequired,
  success: PropTypes.bool.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  success: state.profile.success,
  hasLoaded: state.profile.hasLoaded,
});

export default connect(mapStateToProps, () => ({}))(translate('screens/user/Profile')(Profile));
