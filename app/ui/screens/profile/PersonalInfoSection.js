import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import Moment from 'moment';
import CardSection from '../../components/cardSection/CardSection';
import styles from './style/ProfileScreen';

const PersonalInfoSection = ({ profile, openUrl }) => {
  const profileInfo = {
    starting_year: {
      title: 'Cohort',
      display: (x) => x,
    },
    programme: {
      title: 'Study programme',
      display: (x) => (x === 'computingscience' ? 'Computing science' : 'Information sciences'),
    },
    website: {
      title: 'Website',
      display: (x) => x,
    },
    birthday: {
      title: 'Birthday',
      display: (x) => Moment(x).format('D MMMM YYYY'),
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
  }).filter((n) => n);

  if (profileData) {
    return (
      <CardSection sectionHeader="Personal information">
        {profileData.map((item, i) => (
          <View style={[styles.item, i !== 0 && styles.borderTop]} key={item.title}>
            <Text style={styles.description}>
              {item.title}
            </Text>
            <Text
              style={item.title === 'Website' ? [styles.data, styles.url] : styles.data}
              onPress={item.title === 'Website' ? () => openUrl(`${item.value}`) : null}
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

PersonalInfoSection.propTypes = {
  profile: PropTypes.shape({
    birthday: PropTypes.string,
    starting_year: PropTypes.number,
    programme: PropTypes.string,
    website: PropTypes.string,
    membership_type: PropTypes.string,
  }).isRequired,
  openUrl: PropTypes.func.isRequired,
};

export default PersonalInfoSection;
