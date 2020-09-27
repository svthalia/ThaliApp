import React, { Component } from 'react';
import {
  FlatList, RefreshControl, Switch, Text, TouchableHighlight, View,
} from 'react-native';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';
import unorm from 'unorm';

import styles from './style/AdminScreen';
import Colors from '../../style/Colors';

import SearchHeader from '../../components/searchHeader/SearchHeaderConnector';
import Button from '../../components/button/Button';

class AdminScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      searchKey: '',
      currentFilter: 0,
    };

    for (let i = 0; i < this.props.items.length; i += 1) {
      const {
        pk, name, checkbox, select,
      } = this.props.items[i];

      this.state.items[pk] = {
        name, checkbox, select,
      };
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.itemsAreEqual(this.props.items, prevProps.items)) {
      const items = {};
      for (let i = 0; i < this.props.items.length; i += 1) {
        const {
          pk, name, checkbox, select,
        } = this.props.items[i];

        items[pk] = {
          name, checkbox, select,
        };
      }

      this.setState({ items }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  itemsAreEqual = (a, b) => {
    if (a.length !== b.length) {
      return false;
    }
    a.sort((x, y) => x.pk - y.pk);
    b.sort((x, y) => x.pk - y.pk);

    for (let i = 0; i < a.length; i += 1) {
      if (a[i].pk !== b[i].pk
          || a[i].checkbox !== b[i].checkbox
          || a[i].select.value !== b[i].select.value) {
        return false;
      }
    }
    return true;
  };

  applyFilter = (keys) => {
    const { filterTypes } = this.props;
    const { currentFilter } = this.state;

    return keys.filter(this.containsSearchKey)
      .filter(pk => filterTypes[currentFilter].checkItem(this.state.items[pk]));
  };

  cleanSearchTerm = term => unorm.nfd(term.toLowerCase()).replace(/[\u0300-\u036f]/g, '');

  containsSearchKey = (pk) => {
    const name = this.cleanSearchTerm(this.state.items[pk].name);
    return name.indexOf(this.cleanSearchTerm(this.state.searchKey)) >= 0;
  };

  sortByName = (a, b) => {
    const nameA = this.state.items[a].name.toLowerCase();
    const nameB = this.state.items[b].name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  updateFilter = () => {
    const { currentFilter } = this.state;
    const { filterTypes } = this.props;

    const newFilter = (currentFilter + 1) % filterTypes.length;

    if (newFilter !== currentFilter) {
      Snackbar.show({ text: filterTypes[newFilter].label });
      this.setState({ currentFilter: newFilter });
    }
  };

  updateValue = (pk, checkboxValue, selectValue) => {
    const { items } = this.state;

    items[pk].checkbox = checkboxValue;
    items[pk].select.value = selectValue;

    this.props.updateItem(pk, checkboxValue, selectValue);
    this.setState({ items });
  };

  renderItem = ({ item, index }) => {
    const {
      name, checkbox, select,
    } = this.state.items[item];
    const { checkboxLabel } = this.props;

    return (
      <View key={item} style={[styles.item, index !== 0 && styles.borderTop]}>
        <Text style={[styles.text, styles.name]}>
          {name}
        </Text>
        <View style={styles.itemControls}>
          {checkboxLabel ? (
            <View style={styles.checkboxContainer}>
              <Text style={[styles.text, styles.label]}>
                {checkboxLabel}
              </Text>
              <Switch
                value={checkbox}
                onValueChange={value => this.updateValue(item, value, select.value)}
                trackColor={{
                  false: Colors.lightGray,
                  true: Colors.magenta,
                }}
                thumbColor={checkbox ? Colors.darkMagenta : Colors.grey}
              />
            </View>
          ) : null}
          <View style={styles.selectContainer}>
            {
              select.options.map(({ key, label }, buttonIndex) => (
                <Button
                  key={`${item}_${key}`}
                  onPress={() => this.updateValue(item, checkbox, key)}
                  title={label}
                  color={select.value === key ? Colors.magenta : Colors.grey}
                  style={buttonIndex !== 0 && styles.buttonMargin}
                  textStyle={styles.buttonText}
                  containerStyle={styles.buttonTextContainer}
                />
              ))
            }
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {
      loading, t, handleRefresh, title,
    } = this.props;

    const keys = this.applyFilter(Object.keys(this.state.items));

    const header = (
      <SearchHeader
        title={title}
        searchText={t('Find a member')}
        search={searchKey => this.setState({ searchKey })}
        searchKey={this.state.searchKey}
        leftIcon="arrow-back"
        leftIconAction={this.props.goBack}
      />
    );

    const filterButton = this.props.filterTypes.length > 1 && (
      <TouchableHighlight
        onPress={this.updateFilter}
        style={styles.filterButton}
      >
        <View style={styles.filterButtonWrapper}>
          <Icon
            name="filter-list"
            size={32}
            color={Colors.white}
          />
        </View>
      </TouchableHighlight>
    );

    if (keys.length === 0) {
      return (
        <View style={styles.rootWrapper}>
          {header}
          <Text
            style={[styles.text, styles.noResultsMessage]}
          >
            {t('No entries found with this filter.')}
          </Text>
          {filterButton}
        </View>
      );
    }

    keys.sort(this.sortByName);

    return (
      <View style={styles.rootWrapper}>
        {header}
        <FlatList
          backgroundColor={Colors.background}
          contentContainerStyle={styles.container}
          data={keys}
          renderItem={this.renderItem}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
            />
          )}
          keyExtractor={item => item}
        />
        {filterButton}
      </View>
    );
  }
}

AdminScreen.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    checkbox: PropTypes.bool,
    select: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
      })),
      value: PropTypes.string,
    }),
  })).isRequired,
  checkboxLabel: PropTypes.string,
  filterTypes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    checkItem: PropTypes.func.isRequired,
  })),
  handleRefresh: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  updateItem: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

AdminScreen.defaultProps = {
  checkboxLabel: '',
  filterTypes: [],
};

export default withTranslation('ui/screens/admin/AdminScreen')(AdminScreen);
