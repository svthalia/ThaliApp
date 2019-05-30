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
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';

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
    const value = this.state[key];
    if (field.required) {
      if (field.type === 'integer' && (value === '' || value === null || !value.match(/^-?\d+$/))) {
        return {
          isValid: false,
          reason: this.props.t('This field is required and must be an integer.'),
        };
      }
      if (field.type === 'text' && (value === '' || value === null)) {
        return {
          isValid: false,
          reason: this.props.t('This field is required.'),
        };
      }
      if (field.type === 'boolean' && !value) {
        return {
          isValid: false,
          reason: this.props.t('This field is required.'),
        };
      }
    } else if (field.type === 'integer' && !(value === '' || value === null) && !value.match(/^-?\d+$/)) {
      return {
        isValid: false,
        reason: this.props.t('This field must be an integer.'),
      };
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
    const {
      status, fields, openUrl, update, t, registration,
    } = this.props;

    if (status === 'failure') {
      return <ErrorScreen message={t('Sorry! We couldn\'t load any data.')} />;
    }

    const keys = Object.keys(fields);

    const linkStyles = {
      color: Colors.magenta,
    };

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
            visible={status === 'loading'}
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
            const field = fields[key];
            const validity = this.getFieldValidity(key);
            if (field.type === 'boolean') {
              return (
                <View key={key} style={styles.fieldContainer}>
                  <View style={styles.booleanContainer}>
                    <Text style={styles.field}>
                      {field.label}
                    </Text>
                    <Switch
                      value={this.state[key]}
                      onValueChange={value => this.updateField(key, value)}
                      thumbColor={this.state[key] ? Colors.darkMagenta : Colors.lightGray}
                      trackColor={{
                        false: Colors.lightGray,
                        true: Colors.magenta,
                      }}
                    />
                  </View>
                  <HTML
                    html={field.description}
                    onLinkPress={(event, href) => openUrl(href)}
                    baseFontStyle={styles.description}
                    tagsStyles={{
                      a: linkStyles,
                    }}
                  />
                  {validity.isValid || (
                    <Text style={styles.invalid}>
                      {validity.reason}
                    </Text>
                  )}
                </View>
              );
            } if (field.type === 'integer' || field.type === 'text') {
              return (
                <View key={key} style={styles.fieldContainer}>
                  <Text style={styles.field}>
                    {field.label}
                  </Text>
                  <HTML
                    html={field.description}
                    onLinkPress={(event, href) => openUrl(href)}
                    baseFontStyle={styles.description}
                    tagsStyles={{
                      a: linkStyles,
                    }}
                  />
                  <TextInput
                    value={this.state[key]}
                    onChangeText={value => this.updateField(key, value)}
                    keyboardType={field.type === 'integer' ? 'numeric' : 'default'}
                    style={styles.field}
                    underlineColorAndroid={validity.isValid ? Colors.lightGray
                      : Colors.lightRed}
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
          {status !== 'loading' && (
            <View style={styles.buttonView}>
              <Button
                title={t('Save')}
                color={Colors.magenta}
                onPress={() => update(registration, this.state)}
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
  openUrl: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('screens/events/RegistrationScreen')(withStandardHeader(RegistrationScreen));
