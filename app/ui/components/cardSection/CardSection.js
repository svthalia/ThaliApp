import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, ViewPropTypes,
} from 'react-native';
import styles from './style/CardSection';

const CardSection = props => (
  <View style={[styles.section, props.style]}>
    <Text style={styles.sectionHeader}>
      {props.sectionHeader}
    </Text>
    <View style={[styles.card, props.contentStyle]}>
      {props.children}
    </View>
  </View>
);

CardSection.propTypes = {
  children: PropTypes.node.isRequired,
  sectionHeader: PropTypes.string,
  style: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
};

const defaultStyles = StyleSheet.create({
});

CardSection.defaultProps = {
  sectionHeader: null,
  style: defaultStyles,
  contentStyle: defaultStyles,
};

export default CardSection;
