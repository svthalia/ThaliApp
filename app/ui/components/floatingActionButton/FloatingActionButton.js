import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Colors from '../../style/Colors';
import styles from './style/FloatingActionButton';

const renderText = (text) => (
  <View style={styles.floatingActionButtonItemTextWrapper}>
    <Text style={styles.floatingActionButtonItemText}>{text}</Text>
  </View>
);

const renderIcon = (iconName) => {
  if (iconName) {
    return (
      <View style={styles.floatingActionButtonItemIcon}>
        <Icon name={iconName} size={26} color={Colors.white} />
      </View>
    );
  }
  return null;
};

const renderItem = (item) => (
  <View key='item' style={styles.floatingActionButtonItem}>
    {renderText(item.text)}
    {renderIcon(item.iconName)}
  </View>
);

const FloatingActionButton = (props) => {
  const actions = props.actions.map((action, index) => ({
    text: action.text,
    icon: <Icon name={action.iconName} size={26} color={Colors.white} />,
    name: index.toString(),
    color: Colors.magenta,
    buttonSize: 46,
    textColor: Colors.white,
    textBackground: Colors.magenta,
    render: () => renderItem(action),
  }));

  const onPress = (index) => {
    props.actions[index].onPress();
  };

  return (
    <FloatingAction
      color={Colors.magenta}
      showBackground={false}
      actions={actions}
      onPressItem={onPress}
      floatingIcon={<Icon name={props.iconName} size={32} color={Colors.white} />}
    />
  );
};

FloatingActionButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      iconName: PropTypes.string,
      text: PropTypes.string,
      onPress: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default FloatingActionButton;
