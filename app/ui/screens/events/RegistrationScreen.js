import React, { Component } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import styles from './style/RegistrationScreen';
import Colors from '../../style/Colors';

import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import Button from '../../components/button/Button';
import { withStandardHeader } from '../../components/standardHeader/StandardHeader';

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps = (props) => {
    const update = {};

    const keys = Object.keys(props.fields);
    for (let i = 0; i < keys.length; i += 1) {
      const field = props.fields[keys[i]];
      if (field.type === 'boolean') {
        update[keys[i]] = Boolean(field.value);
      } else if (field.type === 'integer' || field.type === 'text') {
        update[keys[i]] = field.value === null ? '' : String(field.value);
      } else {
        update[keys[i]] = field.value;
      }
    }

    this.setState(update);
  };

  getFieldValidity = (key) => {
    const field = this.props.fields[key];
    const value = this.state[key] ? this.state[key] : field.value;
    if (field.required) {
      if (field.type === 'integer' && (value === '' || value === null || !value.match(/^-?\d+$/))) {
        return {
          isValid: false,
          reason: this.props.t('This field is required and must be an integer.'),
        };
      } if (field.type === 'text' && (value === '' || value === null)) {
        return {
          isValid: false,
          reason: this.props.t('This field is required.'),
        };
      }
    }
    return {
      isValid: true,
    };
  };

  isFormValid = () => {
    const keys = Object.keys(this.props.fields);
    for (let i = 0; i < keys.length; i += 1) {
      if (!this.getFieldValidity(keys[i]).isValid) {
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
    if (this.props.status === 'failure') {
      return <ErrorScreen message={this.props.t('Sorry! We couldn\'t load any data.')} />;
    }

    const keys = Object.keys(this.props.fields);

    return (
      <KeyboardAvoidingView
        style={styles.rootWrapper}
        behavior="padding"
        modalOpen="false"
      >
        <ScrollView
          style={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Modal
            visible={this.props.status === 'loading'}
            transparent
            onRequestClose={() => ({})}
          >
            <View style={styles.overlay}>
              <ActivityIndicator
                animating
                color={Colors.magenta}
                size="large"
              />
            </View>
          </Modal>
          {keys.map((key) => {
            const field = this.props.fields[key];
            const validity = this.getFieldValidity(key);
            if (field.type === 'boolean') {
              return (
                <View key={key} style={styles.booleanContainer}>
                  <Text style={styles.field}>
                    {field.label}
                  </Text>
                  <Switch
                    value={this.state[key]}
                    onValueChange={value => this.updateField(key, value)}
                    thumbTintColor={this.state[key] ? Colors.darkMagenta : Colors.lightGray}
                    onTintColor={Colors.magenta}
                  />
                </View>
              );
            } if (field.type === 'integer' || field.type === 'text') {
              return (
                <View key={key} style={styles.fieldContainer}>
                  <Text style={styles.field}>
                    {field.label}
                  </Text>
                  <TextInput
                    value={this.state[key]}
                    onChangeText={value => this.updateField(key, value)}
                    keyboardType={field.type === 'integer' ? 'numeric' : 'default'}
                    style={styles.field}
                    underlineColorAndroid={validity.isValid ? Colors.lightGray
                      : Colors.lightRed}
                    placeholder={field.description}
                  />
                  {validity.isValid || (
                    <Text style={styles.invalid}>
                      {validity.reason}
                    </Text>
                  )}
                </View>
              );
            }
            return <View />;
          })}
          {this.props.status !== 'loading' && (
            <View style={styles.buttonView}>
              <Button
                title={this.props.t('Save')}
                color={Colors.magenta}
                onPress={() => this.props.update(this.props.registration, this.state)}
                disabled={!this.isFormValid()}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

RegistrationScreen.propTypes = {
  registration: PropTypes.number.isRequired,
  fields: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  status: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('screens/events/Registration')(withStandardHeader(RegistrationScreen));
