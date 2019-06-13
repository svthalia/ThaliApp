import React, { Component } from 'react';
import {
  Animated, BackHandler, Easing, Platform, SafeAreaView, Text, TextInput, View,
} from 'react-native';
import PropTypes from 'prop-types';
import StatusBar from '@react-native-community/status-bar';

import styles from './style/SearchHeader';
import Colors from '../../style/Colors';
import IconButton from '../button/IconButton';

class SearchHeader extends Component {
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
    const { leftIcon, leftIconAction } = this.props;
    const { isSearching } = this.state;
    return (
      <IconButton
        onPress={() => (isSearching ? this.updateSearch(false) : leftIconAction())}
        name={isSearching ? 'arrow-back' : leftIcon}
        style={[styles.leftIcon, isSearching ? styles.magenta : styles.white]}
      />
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
        autoFocus
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
        <IconButton
          onPress={() => this.updateSearch(true)}
          name="search"
          style={[styles.rightIcon, styles.white]}
        />
      );
    } if (searchKey) {
      return (
        <IconButton
          onPress={() => this.updateSearchKey('')}
          name="close"
          style={[styles.rightIcon, styles.gray]}
        />
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
      this.props.search(searchKey);
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
        <SafeAreaView style={styles.safeArea}>
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
        </SafeAreaView>
      </View>
    );
  }
}

SearchHeader.defaultProps = {
  leftIcon: 'menu',
};

SearchHeader.propTypes = {
  title: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
  leftIcon: PropTypes.string,
  leftIconAction: PropTypes.func.isRequired,
};

export default SearchHeader;
