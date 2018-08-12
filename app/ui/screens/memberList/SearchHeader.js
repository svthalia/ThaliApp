import React, { Component } from 'react';
import {
  Animated,
  BackHandler,
  Easing,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './style/SearchHeader';
import Colors from '../../style/Colors';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearching: Boolean(props.searchKey),
      isAnimating: Boolean(props.searchKey),
      scaleValue: new Animated.Value(props.searchKey ? 1 : 0.01),
      searchKey: props.searchKey,
    };

    BackHandler.addEventListener('hardwareBackPress', () => {
      const { isSearching } = this.state;
      if (isSearching) {
        this.updateSearch(false);
        return true;
      }
      return false;
    });
  }

  getLeftIcon = () => {
    const { navigation } = this.props;
    const { isSearching } = this.state;
    return (
      <TouchableOpacity
        onPress={() => (isSearching ? this.updateSearch(false) : navigation.openDrawer())}
      >
        <Icon
          name={isSearching ? 'arrow-back' : 'menu'}
          style={[styles.leftIcon, isSearching ? styles.magenta : styles.white]}
          size={24}
        />
      </TouchableOpacity>
    );
  };

  getCenter = () => {
    const { title, searchText } = this.props;
    const { searchKey, isSearching } = this.state;
    return (isSearching ? (
      <TextInput
        style={styles.input}
        selectionColor={Colors.magenta}
        placeholderTextColor={Colors.lightGray}
        underlineColorAndroid={Colors.transparent}
        placeholder={searchText}
        onChangeText={this.updateSearchKey}
        value={searchKey}
      />
    ) : (
      <Text style={styles.title}>
        {title}
      </Text>
    ));
  };

  getRightIcon = () => {
    const { searchKey, isSearching } = this.state;
    if (!isSearching) {
      return (
        <TouchableOpacity
          onPress={() => this.updateSearch(true)}
        >
          <Icon
            name="search"
            style={[styles.rightIcon, styles.white]}
            size={24}
          />
        </TouchableOpacity>
      );
    } if (searchKey) {
      return (
        <TouchableOpacity
          onPress={() => this.updateSearchKey('')}
        >
          <Icon
            name="close"
            style={[styles.rightIcon, styles.gray]}
            size={24}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  updateSearch = (isSearching) => {
    this.setState({
      isSearching,
    });

    const { scaleValue } = this.state;

    if (isSearching) {
      this.setState({
        isAnimating: true,
      });
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 325,
        easing: Easing.easeIn,
        useNativeDriver: Platform.OS === 'android',
      }).start();
    } else {
      this.updateSearchKey('');
      Animated.timing(scaleValue, {
        toValue: 0.01,
        duration: 325,
        easing: Easing.easeOut,
        useNativeDriver: Platform.OS === 'android',
      }).start(() => {
        this.setState({
          isAnimating: false,
        });
      });
    }
  };

  updateSearchKey = (searchKey) => {
    if (this.state.searchKey !== searchKey) {
      this.setState({ searchKey });
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.props.search(searchKey);
      }, 500);
    }
  };

  render() {
    const { isAnimating, isSearching, scaleValue } = this.state;
    return (
      <View>
        <StatusBar
          backgroundColor={Colors.semiTransparent}
          translucent
          animated
          barStyle={isSearching ? 'dark-content' : 'light-content'}
        />
        <View style={styles.appBar}>
          {isAnimating && (
            <Animated.View
              style={[
                styles.animationView, { transform: [{ scale: scaleValue }] }]}
            />
          )}
          {this.getLeftIcon()}
          {this.getCenter()}
          {this.getRightIcon()}
        </View>
      </View>
    );
  }
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withNavigation(SearchBar);
