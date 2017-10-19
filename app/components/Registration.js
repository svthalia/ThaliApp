import React, { Component } from 'react';
import { View, ScrollView, Switch, TextInput, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './style/registration';
import { colors } from '../style';

import * as registrationActions from '../actions/registration';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const keys = Object.keys(props.fields);
    for (let i = 0; i < keys.length; i += 1) {
      const field = props.fields[keys[i]];
      if (field.type === 'boolean') {
        this.state[keys[i]] = Boolean(field.value);
      } else if (field.type === 'integer' || field.type === 'text') {
        this.state[keys[i]] = field.value === null ? '' : String(field.value);
      } else {
        this.state[keys[i]] = field.value;
      }
    }
  }

  isFieldValid = (key) => {
    const field = this.props.fields[key];
    const value = this.state[key];
    if (field.required) {
      if (field.type === 'integer' && (value === '' || value === null || !value.match(/^\d+$/))) {
        return false;
      } else if (field.type === 'text' && (value === '' || value === null)) {
        return false;
      }
    }
    return true;
  };

  isFormValid = () => {
    const keys = Object.keys(this.props.fields);
    for (let i = 0; i < keys.length; i += 1) {
      if (!this.isFieldValid(keys[i])) {
        return false;
      }
    }
    return true;
  };

  updateField = (key, value) => {
    const update = {};
    update[key] = value;
    this.setState(update);
  };

  render() {
    const keys = Object.keys(this.props.fields);

    return (
      <ScrollView style={styles.content}>
        {keys.map((key) => {
          const field = this.props.fields[key];
          if (field.type === 'boolean') {
            return (
              <View key={key} style={styles.booleanContainer}>
                <Text style={styles.field}>{field.label}</Text>
                <Switch
                  value={this.state[key]}
                  onValueChange={value => this.updateField(key, value)}
                  thumbTintColor={this.state[key] ? colors.darkMagenta : colors.lightGray}
                  onTintColor={colors.magenta}
                />
              </View>
            );
          } else if (field.type === 'integer' || field.type === 'text') {
            return (
              <View key={key} style={styles.fieldContainer}>
                <Text style={styles.field}>{field.label}</Text>
                <TextInput
                  value={this.state[key]}
                  onChangeText={value => this.updateField(key, value)}
                  keyboardType={field.type === 'integer' ? 'numeric' : 'default'}
                  style={styles.field}
                  underlineColorAndroid={this.isFieldValid(key) ? colors.lightGray :
                                         colors.lightRed}
                  placeholder={field.description}
                />
              </View>
            );
          }
          return <View />;
        })}
        <View style={styles.buttonView}>
          <Button
            title="Aanpassen"
            color={colors.magenta}
            onPress={() => this.props.update(this.props.registration, this.state)}
            disabled={!this.isFormValid()}
          />
        </View>
      </ScrollView>
    );
  }
}

Registration.propTypes = {
  registration: PropTypes.number.isRequired,
  fields: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
  update: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  registration: state.registration.registration,
  fields: state.registration.fields,
});

const mapDispatchToProps = dispatch => ({
  update: (registration, fields) => dispatch(registrationActions.update(registration, fields)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
