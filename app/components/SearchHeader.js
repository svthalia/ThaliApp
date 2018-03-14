import React, { Component } from 'react';
import { StatusBar, Animated, Easing, BackHandler, TouchableOpacity, TextInput, Text, Platform, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { updateDrawer } from '../actions/navigation';

import styles from './style/searchHeader';
import { colors } from '../style';

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
      if (this.state.isSearching) {
        this.updateSearch(false);
        return true;
      }
      return false;
    });
  }

  getLeftIcon = () => (
    <TouchableOpacity
      onPress={this.state.isSearching ? () => this.updateSearch(false) : this.props.openDrawer}
    >
      <Icon
        name={this.state.isSearching ? 'arrow-back' : 'menu'}
        style={[styles.leftIcon, this.state.isSearching ? styles.magenta : styles.white]}
        size={24}
      />
    </TouchableOpacity>
  );

  getCenter = () => (
    this.state.isSearching ? (
      <TextInput
        style={styles.input}
        selectionColor={colors.magenta}
        placeholderTextColor={colors.lightGray}
        underlineColorAndroid={colors.transparent}
        placeholder={this.props.searchText}
        onChangeText={this.updateSearchKey}
        value={this.state.searchKey}
      />
      ) : <Text style={styles.title}>{this.props.title}</Text>
  );

  getRightIcon = () => {
    if (!this.state.isSearching) {
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
    } else if (this.state.searchKey) {
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

    if (isSearching) {
      this.setState({
        isAnimating: true,
      });
      Animated.timing(this.state.scaleValue, {
        toValue: 1,
        duration: 325,
        easing: Easing.easeIn,
        useNativeDriver: Platform.OS === 'android',
      }).start();
    } else {
      this.updateSearchKey('');
      Animated.timing(this.state.scaleValue, {
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
    return (
      <View>
        <StatusBar
          backgroundColor={colors.semiTransparent}
          translucent
          animated
          barStyle={this.state.isSearching ? 'dark-content' : 'light-content'}
        />
        <View style={styles.appBar}>
          {this.state.isAnimating && <Animated.View
            style={[
              styles.animationView, { transform: [{ scale: this.state.scaleValue }] }]}
          />}
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
  openDrawer: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
};

const mapHeaderDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(updateDrawer(true)),
});

export default connect(() => ({}), mapHeaderDispatchToProps)(SearchBar);
