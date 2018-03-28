import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Alert, Image, ScrollView, Text, View, RefreshControl, TouchableHighlight, Platform, Linking } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Moment from 'moment';
import HTML from 'react-native-render-html';

import styles, { memberSize } from './style/Event';
import MemberView from '../../components/memberView/MemberView';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import Colors from '../../style/Colors';

import * as eventActions from '../../../actions/event';
import * as registrationActions from '../../../actions/registration';
import * as pizzaActions from '../../../actions/pizza';
import Button from '../../components/button/Button';

class Event extends Component {
  cancelPrompt = (pk) => {
    const cancelDeadlineDate = new Date(this.props.data.cancel_deadline);
    let message = this.props.t('Are you sure you want to cancel your registration?');
    if (this.props.data.cancel_deadline !== null && cancelDeadlineDate <= new Date()) {
      message = this.props.t('The deadline has passed, are you sure you want to cancel your registration and pay the full costs of €{{ fine }}? You will not be able to undo this!', { fine: this.props.data.fine });
    }
    return Alert.alert(
  this.props.t('Cancel registration?'),
      message,
      [
        { text: this.props.t('No') },
        { text: this.props.t('Yes'), onPress: () => this.props.cancel(pk) },
      ],
    );
  };

  eventDesc = (data) => {
    const startDate = Moment(data.start).format('D MMM YYYY, HH:mm');
    const endDate = Moment(data.end).format('D MMM YYYY, HH:mm');

    const infoTexts = [];

    infoTexts.push(
      <View key="start-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="start-title">{this.props.t('From')}:</Text>
        <Text style={styles.infoValueText} key="start-value">{startDate}</Text>
      </View>,
      );
    infoTexts.push(
      <View key="end-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="end-title">{this.props.t('Until')}:</Text>
        <Text style={styles.infoValueText} key="end-value">{endDate}</Text>
      </View>,
      );
    infoTexts.push(
      <View key="loc-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="loc-title">{this.props.t('Location')}:</Text>
        <Text style={styles.infoValueText} key="loc-value">{data.location}</Text>
      </View>,
      );
    infoTexts.push(
      <View key="price-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="price-title">{this.props.t('Price')}:</Text>
        <Text style={styles.infoValueText} key="price-value">€{data.price}</Text>
      </View>,
      );

    if (data.registration_start !== null || data.registration_end !== null) {
      const registrationDeadline = Moment(data.registration_end).format('D MMM YYYY, HH:mm');
      const cancelDeadline = Moment(data.cancel_deadline).format('D MMM YYYY, HH:mm');

      infoTexts.push(
        <View key="registrationend-holder" style={styles.infoHolder}>
          <Text style={styles.infoText} key="registrationend-title">{this.props.t('Registration deadline')}:</Text>
          <Text style={styles.infoValueText} key="registrationend-value">{registrationDeadline}</Text>
        </View>,
        );
      infoTexts.push(
        <View key="canceldeadline-holder" style={styles.infoHolder}>
          <Text style={styles.infoText} key="canceldeadline-title">{this.props.t('Cancellation deadline')}:</Text>
          <Text style={styles.infoValueText} key="canceldeadline-value">{cancelDeadline}</Text>
        </View>,
        );

      let participantsText = `${data.num_participants} ${this.props.t('registrations')}`;
      if (data.max_participants) {
        participantsText += ` (${data.max_participants} ${this.props.t('max')})`;
      }

      infoTexts.push(
        <View key="participants-holder" style={styles.infoHolder}>
          <Text style={styles.infoText} key="participants-title">{this.props.t('Number of registrations')}:</Text>
          <Text style={styles.infoValueText} key="participants-value">{participantsText}</Text>
        </View>,
        );

      if (data.user_registration) {
        let registrationState;
        if (data.user_registration.is_late_cancellation) {
          registrationState = this.props.t('Your registration is cancelled after the cancellation deadline');
        } else if (data.user_registration.is_cancelled) {
          registrationState = this.props.t('Your registration is cancelled');
        } else if (data.user_registration.queue_position === null) {
          registrationState = this.props.t('You are registered');
        } else if (data.user_registration.queue_position > 0) {
          registrationState = this.props.t('Queue position {{pos}}', { pos: data.user_registration.queue_position });
        } else {
          registrationState = this.props.t('Your registration is cancelled');
        }

        infoTexts.push(
          <View key="status-holder" style={styles.infoHolder}>
            <Text style={styles.infoText} key="status-title">{this.props.t('Registration status')}:</Text>
            <Text style={styles.infoValueText} key="status-value">{registrationState}</Text>
          </View>,
          );
      }
    }

    if (data.is_pizza_event) {
      infoTexts.push(
        <View key="pizza-holder" style={styles.pizzaHolder}>
          <Text style={styles.pizzaText} key="pizza-title">Pizza:</Text>
          <Button
            color={Colors.magenta}
            title="Bestel"
            onPress={this.props.retrievePizzaInfo}
          />
        </View>,
      );
    }

    return (
      <View>
        {infoTexts}
      </View>
    );
  };

  eventInfo = (event) => {
    let text = '';

    const nowDate = new Date();
    const startRegDate = new Date(event.registration_start);
    const endRegDate = new Date(event.registration_end);
    const cancelDeadlineDate = new Date(event.cancel_deadline);

    const regRequired = event.registration_start !== null || event.registration_end !== null;
    const regStarted = startRegDate <= nowDate;
    const regAllowed = regRequired && endRegDate > nowDate && regStarted;
    const afterCancelDeadline = event.cancel_deadline !== null && cancelDeadlineDate <= nowDate;

    if (!regRequired) {
      text = this.props.t('No registration required.');
      if (event.no_registration_message) {
        text = event.no_registration_message;
      }
    } else if (!regStarted) {
      const registrationStart = Moment(event.registration_start).format('D MMM YYYY, HH:mm');
      text = this.props.t('Registration will open {{start}}', { start: registrationStart });
    } else if (!regAllowed) {
      text = this.props.t('Registration is not possible anymore.');
    }

    if (afterCancelDeadline) {
      if (text.length > 0) {
        text += ' ';
      }
      text += this.props.t(
        'Cancellation isn\'t possible anymore without having to pay the full ' +
        'costs of €{{fine}}. Also note that you will be unable to re-register.',
        { fine: event.fine },
      );
    }

    if (text.length > 0) {
      return (<Text style={styles.registrationText}>{text}</Text>);
    }
    return (<View />);
  };

  eventActions = (event) => {
    const nowDate = new Date();
    const startRegDate = new Date(event.registration_start);
    const endRegDate = new Date(event.registration_end);

    const regRequired = event.registration_start !== null || event.registration_end !== null;
    const regStarted = startRegDate <= nowDate;
    const regAllowed = regRequired && endRegDate > nowDate &&
                       regStarted && event.registration_allowed;

    // Needed once registration on server implemented
    if (regAllowed) {
      if (event.user_registration === null || event.user_registration.is_cancelled) {
        const text = event.max_participants && event.max_participants <= event.num_participants ?
          this.props.t('Put me on the waiting list') : this.props.t('Register');
        return (
          <View style={styles.registrationActions}>
            <Button
              color={Colors.magenta}
              title={text}
              onPress={() => this.props.register(event.pk)}
            />
          </View>
        );
      } else if (event.user_registration && !event.user_registration.is_cancelled &&
                 regRequired && regStarted) {
        if (regStarted && event.user_registration && !event.user_registration.is_cancelled &&
            event.has_fields) {
          return (
            <View style={styles.registrationActions}>
              <Button
                title={this.props.t('Update registration')}
                onPress={() => this.props.fields(event.user_registration.pk)}
              />
              <View style={styles.secondButtonMargin}>
                <Button
                  title={this.props.t('Cancel registration')}
                  onPress={() => this.cancelPrompt(event.user_registration.pk)}
                />
              </View>
            </View>
          );
        }
        return (
          <View style={styles.registrationActions}>
            <Button title={this.props.t('Cancel registration')} onPress={() => this.cancelPrompt(event.user_registration.pk)} />
          </View>
        );
      }
    }

    return (<View />);
  };

  registrationsGrid = (registrations) => {
    if (registrations !== undefined && registrations.length > 0) {
      return (
        <View>
          <View style={styles.divider} />
          <Text style={styles.registrationsTitle}>{this.props.t('Registrations')}</Text>
          <FlatList
            numColumns={3}
            data={this.props.registrations}
            renderItem={item => (
              <MemberView
                key={item.item.pk}
                member={{
                  pk: item.item.member,
                  photo: item.item.avatar.medium,
                  name: item.item.name,
                }}
                style={styles.memberView}
                size={memberSize}
              />
            )}
            keyExtractor={item => item.pk}
          />
        </View>
      );
    }
    return (<View />);
  };

  handleRefresh = () => {
    this.props.refresh(this.props.data.pk);
  };

  render() {
    if (this.props.status === 'initial') {
      return <LoadingScreen />;
    }

    const fontStyles = {
      fontSize: 14,
      lineHeight: 24.0,
      color: Colors.black,
    };

    const linkStyles = {
      color: Colors.magenta,
    };

    if (this.props.status === 'success') {
      return (
        <ScrollView
          backgroundColor={Colors.background}
          contentContainerStyle={styles.eventView}
          refreshControl={(
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.handleRefresh}
            />
          )}
        >
          <TouchableHighlight
            onPress={() => this.props.openMaps(this.props.data.map_location)}
            style={styles.locationImageWrapper}
          >
            <Image
              style={styles.locationImage}
              source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${this.props.data.map_location}&zoom=13&size=450x250&markers=${this.props.data.map_location}` }}
            />
          </TouchableHighlight>
          <Text style={styles.titleText}>{this.props.data.title}</Text>
          {this.eventDesc(this.props.data)}
          {this.eventActions(this.props.data)}
          {this.eventInfo(this.props.data)}
          <View style={styles.divider} />
          <HTML
            html={this.props.data.description}
            onLinkPress={(event, href) => Linking.openURL(href)}
            baseFontStyle={fontStyles}
            tagsStyles={{
              a: linkStyles,
            }}
          />
          {this.registrationsGrid(this.props.registrations, this.props.t)}
        </ScrollView>
      );
    }
    return (
      <ScrollView
        backgroundColor={Colors.background}
        contentContainerStyle={styles.flex}
        refreshControl={(
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this.handleRefresh}
          />
        )}
      >
        <ErrorScreen message={this.props.t('Could not load the event...')} />
      </ScrollView>
    );
  }
}

Event.propTypes = {
  data: PropTypes.shape({
    pk: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    organiser: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    map_location: PropTypes.string.isRequired,
    registration_allowed: PropTypes.bool.isRequired,
    has_fields: PropTypes.bool.isRequired,
    registration_start: PropTypes.string,
    registration_end: PropTypes.string,
    cancel_deadline: PropTypes.string,
    max_participants: PropTypes.number,
    num_participants: PropTypes.number,
    price: PropTypes.string,
    fine: PropTypes.string,
    user_registration: PropTypes.shape({
      pk: PropTypes.number,
      registered_on: PropTypes.string,
      queue_position: PropTypes.number,
      is_cancelled: PropTypes.bool,
      is_late_cancellation: PropTypes.bool,
    }),
    no_registration_message: PropTypes.string,
    is_pizza_event: PropTypes.bool.isRequired,
  }).isRequired,
  registrations: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    member: PropTypes.number,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      full: PropTypes.string.isRequired,
      large: PropTypes.string.isRequired,
      medium: PropTypes.string.isRequired,
      small: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  fields: PropTypes.func.isRequired,
  openMaps: PropTypes.func.isRequired,
  retrievePizzaInfo: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  data: state.event.data,
  registrations: state.event.registrations,
  status: state.event.status,
  loading: state.event.loading,
});

const mapDispatchToProps = dispatch => ({
  refresh: pk => dispatch(eventActions.event(pk)),
  register: event => dispatch(registrationActions.register(event)),
  cancel: registration => dispatch(registrationActions.cancel(registration)),
  fields: registration => dispatch(registrationActions.retrieveFields(registration)),
  openMaps: location => Linking.openURL(`https://maps.${Platform.OS === 'ios' ? 'apple' : 'google'}.com/maps?daddr=${location}`),
  retrievePizzaInfo: () => dispatch(pizzaActions.retrievePizzaInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('screens/events/Event')(Event));
