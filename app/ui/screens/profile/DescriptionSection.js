import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import CardSection from '../../components/cardSection/CardSection';
import styles from './style/ProfileScreen';

const DescriptionSection = (
  { profile: { display_name: name, profile_description: description } },
) => (
  <CardSection
    sectionHeader={`About ${name}`}
  >
    <Text
      style={[
        styles.data,
        styles.item,
        styles.profileText,
        !description && styles.italics]}
    >
      {description || 'This member has not written a description yet.'}
    </Text>
  </CardSection>
);

DescriptionSection.propTypes = {
  profile: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
    profile_description: PropTypes.string,
  }).isRequired,
};

export default DescriptionSection;
