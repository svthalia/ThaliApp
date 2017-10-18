import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking, ScrollView, Text, View, Animated, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';

import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';

import { back } from '../actions/navigation';

import styles, { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE } from './style/profile';

const getDescription = profile => ([
  <Text style={[styles.sectionHeader, styles.marginTop]} key="title">{`Over ${profile.display_name}`}</Text>,
  <View style={styles.card} key="content">
    <Text
      style={[
        styles.data,
        styles.item,
        !profile.profile_description && styles.italics]}
    >{profile.profile_description || 'Dit lid heeft nog geen beschrijving geschreven'}</Text>
  </View>,
]);

const getPersonalInfo = (profile) => {
  const profileInfo = {
    starting_year: {
      title: 'Cohort',
      display: x => x,
    },
    programme: {
      title: 'Studie',
      display: x => (x === 'computingscience' ? 'Computing science' : 'Information sciences'),
    },
    website: {
      title: 'Website',
      display: x => x,
    },
    birthday: {
      title: 'Verjaardag',
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
    return [
      <Text style={styles.sectionHeader} key="title">Persoonlijke gegevens</Text>,
      <View style={styles.card} key="content">
        {profileData.map((item, i) => (
          <View style={[styles.item, i !== 0 && styles.borderTop]} key={item.title}>
            <Text style={styles.description}>{item.title}</Text>
            <Text
              style={item.title === 'Website' ? [styles.data, styles.url] : styles.data}
              onPress={item.title === 'Website' ? () => Linking.openURL(`${item.value}`) : null}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>,
    ];
  }
  return <View />;
};

const getAchievements = (profile) => {
  if (profile.achievements.length) {
    return [
      <Text style={styles.sectionHeader} key="title">Verdiensten voor Thalia</Text>,
      <View style={styles.card} key="content">
        {profile.achievements.map((achievement, i) => (
          <View style={[styles.item, i !== 0 && styles.borderTop]} key={achievement.name}>
            <Text style={styles.description}>{achievement.name}</Text>
            {achievement.periods && achievement.periods.map((period) => {
              let start = Moment(period.since);
              start = start.isSame(Moment([1970, 1, 1]), 'day') ? '?' : start.format('D MMMM YYYY');
              const end = period.until ? Moment(period.until).format('D MMMM YYYY') : 'heden';

              let text = '';
              if (period.role) {
                text = `${period.role}: `;
              } else if (period.chair) {
                text = 'Voorzitter: ';
              }
              text += `${start} - ${end}`;

              return <Text style={styles.data} key={period.since}>{text}</Text>;
            })}
          </View>
        ))}
      </View>,
    ];
  }
  return <View />;
};

class Profile extends Component {

  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);
  }

  getAppbar = () => {
    const headerHeight = this.props.success ? this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    }) : HEADER_MIN_HEIGHT;
    const imageOpacity = this.props.success ? this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    }) : 0;
    const imageTranslate = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    const textSize = this.props.success ? this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [30, 30, 20],
      extrapolate: 'clamp',
    }) : 20;

    const textPosLeft = this.props.success ? this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [20, 20, 60],
      extrapolate: 'clamp',
    }) : 60;

    const textPosBottom = this.props.success ? this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [20, 20, (HEADER_MIN_HEIGHT - 24) / 2],
      extrapolate: 'clamp',
    }) : (HEADER_MIN_HEIGHT - 24) / 2;

    return (
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Image
          style={[
            styles.backgroundImage,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslate }],
            },
          ]}
          source={{ uri: this.props.profile.photo }}
        >
          <LinearGradient colors={['#55000000', '#000000']} style={styles.overlayGradient} />
        </Animated.Image>
        <Animated.View style={styles.appBar}>
          <TouchableOpacity
            onPress={this.props.back}
          >
            <Icon
              name="arrow-back"
              style={styles.icon}
              size={24}
            />
          </TouchableOpacity>
          <Animated.Text
            style={[styles.title, {
              left: textPosLeft,
              bottom: textPosBottom,
              fontSize: textSize,
            }]}
          >{this.props.success ? this.props.profile.display_name : 'Profiel'}</Animated.Text>
        </Animated.View>
      </Animated.View>
    );
  };

  render() {
    if (!this.props.hasLoaded) {
      return (
        <View style={styles.container}>
          <LoadingScreen />
          {this.getAppbar()}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {
          this.props.success ? (
            <ScrollView
              style={styles.container}
              scrollEventThrottle={16}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }])}
            >
              <View style={styles.content}>
                {getDescription(this.props.profile)}
                {getPersonalInfo(this.props.profile)}
                {getAchievements(this.props.profile)}
              </View>
            </ScrollView>
            ) : (
              <View style={styles.container}>
                <ErrorScreen message="Sorry! We couldn't load any data." />
              </View>
            )
        }
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
  back: PropTypes.func.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  success: state.profile.success,
  hasLoaded: state.profile.hasLoaded,
});

const mapDispatchToProps = dispatch => ({
  back: () => dispatch(back()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
