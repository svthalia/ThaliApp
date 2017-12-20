import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Alert, Image, ScrollView, Text, View, RefreshControl, Button } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/nl';

import styles, { memberSize } from './style/event';
import MemberView from './MemberView';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
import { colors } from '../style';

import * as eventActions from '../actions/event';
import * as registrationActions from '../actions/registration';

class Event extends Component {
  cancelPrompt = (pk) => {
    const cancelDeadlineDate = new Date(this.props.data.cancel_deadline);
    let message = 'Are you sure you want to cancel your registration?';
    if (this.props.data.cancel_deadline !== null && cancelDeadlineDate <= new Date()) {
      message = 'The deadline has passed, are you sure you want to cancel your registration and'
      + ` pay the full costs of €${this.props.data.fine}? You will not be able to undo this!`;
    }
    return Alert.alert(
      'Cancel registration?',
      message,
      [
        { text: 'Dismiss' },
        { text: 'Cancel registration', onPress: () => this.props.cancel(pk) },
      ],
    );
  };

  eventDesc = (data) => {
    const startDate = Moment(data.start).format('D MMM YYYY, HH:mm');
    const endDate = Moment(data.end).format('D MMM YYYY, HH:mm');

    const infoTexts = [];

    infoTexts.push(
      <View key="start-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="start-title">Van:</Text>
        <Text style={styles.infoValueText} key="start-value">{startDate}</Text>
      </View>,
      );
    infoTexts.push(
      <View key="end-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="end-title">Tot:</Text>
        <Text style={styles.infoValueText} key="end-value">{endDate}</Text>
      </View>,
      );
    infoTexts.push(
      <View key="loc-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="loc-title">Locatie:</Text>
        <Text style={styles.infoValueText} key="loc-value">{data.location}</Text>
      </View>,
      );
    infoTexts.push(
      <View key="price-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="price-title">Prijs:</Text>
        <Text style={styles.infoValueText} key="price-value">€{data.price}</Text>
      </View>,
      );

    if (data.registration_start !== null || data.registration_end !== null) {
      const registrationDeadline = Moment(data.registration_end).format('D MMM YYYY, HH:mm');
      const cancelDeadline = Moment(data.cancel_deadline).format('D MMM YYYY, HH:mm');

      infoTexts.push(
        <View key="registrationend-holder" style={styles.infoHolder}>
          <Text style={styles.infoText} key="registrationend-title">Aanmelddeadline:</Text>
          <Text style={styles.infoValueText} key="registrationend-value">{registrationDeadline}</Text>
        </View>,
        );
      infoTexts.push(
        <View key="canceldeadline-holder" style={styles.infoHolder}>
          <Text style={styles.infoText} key="canceldeadline-title">Afmelddeadline:</Text>
          <Text style={styles.infoValueText} key="canceldeadline-value">{cancelDeadline}</Text>
        </View>,
        );

      let participantsText = `${data.num_participants} aanmeldingen`;
      if (data.max_participants) {
        participantsText += ` (${data.max_participants} max)`;
      }

      infoTexts.push(
        <View key="participants-holder" style={styles.infoHolder}>
          <Text style={styles.infoText} key="participants-title">Aantal aanmeldingen:</Text>
          <Text style={styles.infoValueText} key="participants-value">{participantsText}</Text>
        </View>,
        );

      if (data.user_registration) {
        let registrationState;
        if (data.user_registration.is_late_cancellation) {
          registrationState = 'Je bent afgemeld na de afmelddeadline';
        } else if (data.user_registration.is_cancelled) {
          registrationState = 'Je bent afgemeld';
        } else if (data.user_registration.queue_position === null) {
          registrationState = 'Je bent aangemeld';
        } else if (data.user_registration.queue_position > 0) {
          registrationState = `Wachtlijst positie ${data.user_registration.queue_position}`;
        } else {
          registrationState = 'Je bent afgemeld';
        }

        infoTexts.push(
          <View key="status-holder" style={styles.infoHolder}>
            <Text style={styles.infoText} key="status-title">Aanmeldstatus:</Text>
            <Text style={styles.infoValueText} key="status-value">{registrationState}</Text>
          </View>,
          );
      }
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
      text = 'Geen aanmelding vereist.';
      if (event.no_registration_message) {
        text = event.no_registration_message;
      }
    } else if (!regStarted) {
      const registrationStart = Moment(event.registration_start).format('D MMM YYYY, HH:m');
      text = `Aanmelden opent ${registrationStart}.`;
    } else if (!regAllowed) {
      text = 'Aanmelden is niet meer mogelijk.';
    }

    if (afterCancelDeadline) {
      if (text.length > 0) {
        text += ' ';
      }
      text += `Afmelden is niet meer mogelijk zonder de volledige kosten van €${event.fine} te ` +
        'betalen. Let op: je kunt je hierna niet meer aanmelden.';
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
                     'Zet me op de wachtlijst' : 'Aanmelden';
        return (
          <View style={styles.registrationActions}>
            <Button
              color={colors.magenta}
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
                color={colors.magenta}
                title="Aanmelding bijwerken"
                onPress={() => this.props.fields(event.user_registration.pk)}
              />
              <View style={styles.secondButtonMargin}>
                <Button
                  color={colors.magenta}
                  title="Afmelden"
                  onPress={() => this.cancelPrompt(event.user_registration.pk)}
                />
              </View>
            </View>
          );
        }
        return (
          <View style={styles.registrationActions}>
            <Button color={colors.magenta} title="Afmelden" onPress={() => this.cancelPrompt(event.user_registration.pk)} />
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
          <Text style={styles.registrationsTitle}>Aanmeldingen</Text>
          <FlatList
            numColumns={3}
            data={this.props.registrations}
            renderItem={item => (
              <MemberView
                key={item.item.pk}
                member={{
                  pk: item.item.member,
                  photo: item.item.photo,
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

    if (this.props.status === 'success') {
      return (
        <ScrollView
          backgroundColor={colors.background}
          contentContainerStyle={styles.eventView}
          refreshControl={(
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.handleRefresh}
            />
          )}
        >
          <Image
            style={styles.locationImage}
            source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${this.props.data.map_location}&zoom=13&size=450x250&markers=${this.props.data.map_location}` }}
          />
          <Text style={styles.titleText}>{this.props.data.title}</Text>
          {this.eventDesc(this.props.data)}
          {this.eventActions(this.props.data)}
          {this.eventInfo(this.props.data)}
          <View style={styles.divider} />
          <Text style={styles.descText}>{this.props.data.description}</Text>
          {this.registrationsGrid(this.props.registrations)}
        </ScrollView>
      );
    }
    return (
      <ScrollView
        backgroundColor={colors.background}
        contentContainerStyle={styles.flex}
        refreshControl={(
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this.handleRefresh}
          />
        )}
      >
        <ErrorScreen message="Could not load the event..." />
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
  }).isRequired,
  registrations: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    member: PropTypes.number,
    name: PropTypes.string.isRequired,
  })).isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  fields: PropTypes.func.isRequired,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
