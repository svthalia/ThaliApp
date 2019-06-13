import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Moment from 'moment';
import CardSection from '../../components/cardSection/CardSection';
import styles from './style/ProfileScreen';

const AchievementSection = ({ profile, t, type }) => {
  const memberships = profile[type];
  const sectionHeader = type === 'societies' ? t('Societies') : t('Achievements for Thalia');
  if (memberships.length) {
    return (
      <CardSection
        sectionHeader={sectionHeader}
      >
        {memberships.map((achievement, i) => (
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

AchievementSection.propTypes = {
  profile: PropTypes.shape({
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
  t: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default withTranslation('ui/screens/profile/AchievementSection')(AchievementSection);
