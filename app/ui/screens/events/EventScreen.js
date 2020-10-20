import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Moment from 'moment';
import HTML from 'react-native-render-html';
import Share from 'react-native-share';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles, { memberSize } from './style/EventScreen';
import MemberView from '../../components/memberView/MemberViewConnector';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import Colors from '../../style/Colors';

import { termsAndConditionsUrl, url as serverUrl } from '../../../utils/url';
import Button from '../../components/button/Button';
import StandardHeader from '../../components/standardHeader/StandardHeader';

class EventScreen extends Component {
  cancelPrompt = (pk) => {
    const { data, cancel } = this.props;
    const cancelDeadlineDate = new Date(data.cancel_deadline);
    let message = 'Are you sure you want to cancel your registration?';
    if (data.cancel_deadline !== null && cancelDeadlineDate <= new Date()) {
      message =
        'The deadline has passed, are you sure you want to cancel your registration' +
        ` and pay the full costs of €${data.fine}? You will not be able to undo this!`;
    }
    return Alert.alert('Cancel registration?', message, [
      { text: 'No' },
      { text: 'Yes', onPress: () => cancel(pk) },
    ]);
  };

  eventProperties = () => {
    const { data } = this.props;

    const nowDate = new Date();
    const startRegDate = new Date(data.registration_start);
    const endRegDate = new Date(data.registration_end);
    const cancelDeadlineDate = new Date(data.cancel_deadline);

    const registrationRequired =
      data.registration_start !== null || data.registration_end !== null;
    const registrationStarted = startRegDate <= nowDate;
    const isLateCancellation =
      data.user_registration && data.user_registration.is_late_cancellation;

    const registrationAllowed =
      registrationRequired &&
      endRegDate > nowDate &&
      registrationStarted &&
      data.registration_allowed &&
      !isLateCancellation;

    const afterCancelDeadline =
      data.cancel_deadline !== null && cancelDeadlineDate <= nowDate;

    return {
      registrationRequired,
      registrationStarted,
      isLateCancellation,
      registrationAllowed,
      afterCancelDeadline,
    };
  };

  eventDesc = () => {
    const { data } = this.props;

    const startDate = Moment(data.start).format('D MMM YYYY, HH:mm');
    const endDate = Moment(data.end).format('D MMM YYYY, HH:mm');

    const infoTexts = [];

    infoTexts.push(
      <View key='start-holder' style={styles.infoHolder}>
        <Text style={styles.infoText} key='start-title'>
          From :
        </Text>
        <Text style={styles.infoValueText} key='start-value'>
          {startDate}
        </Text>
      </View>
    );
    infoTexts.push(
      <View key='end-holder' style={styles.infoHolder}>
        <Text style={styles.infoText} key='end-title'>
          Until :
        </Text>
        <Text style={styles.infoValueText} key='end-value'>
          {endDate}
        </Text>
      </View>
    );
    infoTexts.push(
      <View key='loc-holder' style={styles.infoHolder}>
        <Text style={styles.infoText} key='loc-title'>
          Location :
        </Text>
        <Text style={styles.infoValueText} key='loc-value'>
          {data.location}
        </Text>
      </View>
    );
    infoTexts.push(
      <View key='price-holder' style={styles.infoHolder}>
        <Text style={styles.infoText} key='price-title'>
          Price :
        </Text>
        <Text style={styles.infoValueText} key='price-value'>
          €{data.price}
        </Text>
      </View>
    );

    const { registrationRequired } = this.eventProperties();
    if (registrationRequired) {
      const registrationDeadline = Moment(data.registration_end).format(
        'D MMM YYYY, HH:mm'
      );
      const cancelDeadline = Moment(data.cancel_deadline).format('D MMM YYYY, HH:mm');

      infoTexts.push(
        <View key='registrationend-holder' style={styles.infoHolder}>
          <Text style={styles.infoText} key='registrationend-title'>
            Registration deadline :
          </Text>
          <Text style={styles.infoValueText} key='registrationend-value'>
            {registrationDeadline}
          </Text>
        </View>
      );
      infoTexts.push(
        <View key='canceldeadline-holder' style={styles.infoHolder}>
          <Text style={styles.infoText} key='canceldeadline-title'>
            Cancellation deadline :
          </Text>
          <Text style={styles.infoValueText} key='canceldeadline-value'>
            {cancelDeadline}
          </Text>
        </View>
      );

      let participantsText = `${data.num_participants} registrations`;
      if (data.max_participants) {
        participantsText += ` (${data.max_participants} max)`;
      }

      infoTexts.push(
        <View key='participants-holder' style={styles.infoHolder}>
          <Text style={styles.infoText} key='participants-title'>
            Number of registrations :
          </Text>
          <Text style={styles.infoValueText} key='participants-value'>
            {participantsText}
          </Text>
        </View>
      );

      if (data.user_registration) {
        let registrationState;
        if (data.user_registration.is_late_cancellation) {
          registrationState =
            'Your registration is cancelled after the cancellation deadline';
        } else if (data.user_registration.is_cancelled) {
          registrationState = 'Your registration is cancelled';
        } else if (data.user_registration.queue_position === null) {
          registrationState = 'You are registered';
        } else if (data.user_registration.queue_position > 0) {
          registrationState = `Queue position ${data.user_registration.queue_position}`;
        } else {
          registrationState = 'Your registration is cancelled';
        }

        infoTexts.push(
          <View key='status-holder' style={styles.infoHolder}>
            <Text style={styles.infoText} key='status-title'>
              Registration status :
            </Text>
            <Text style={styles.infoValueText} key='status-value'>
              {registrationState}
            </Text>
          </View>
        );
      }
    }

    if (data.is_pizza_event) {
      infoTexts.push(
        <View key='pizza-holder' style={styles.pizzaHolder}>
          <Text style={styles.pizzaText} key='pizza-title'>
            Pizza:
          </Text>
          <Button
            color={Colors.magenta}
            title='Order'
            onPress={this.props.retrievePizzaInfo}
          />
        </View>
      );
    }

    return <View>{infoTexts}</View>;
  };

  eventInfo = () => {
    const { data } = this.props;
    let text = '';

    const {
      registrationRequired,
      registrationStarted,
      registrationAllowed,
      isLateCancellation,
      afterCancelDeadline,
    } = this.eventProperties();

    if (!registrationRequired) {
      text = 'No registration required.';
      if (data.no_registration_message) {
        text = data.no_registration_message;
      }
    } else if (!registrationStarted) {
      const registrationStart = Moment(data.registration_start).format(
        'D MMM YYYY, HH:mm'
      );
      text = `Registration will open ${registrationStart}`;
    } else if (!registrationAllowed) {
      text = 'Registration is not possible anymore.';
    } else if (isLateCancellation) {
      text =
        'Registration is not allowed anymore, as you cancelled your registration after the deadline.';
    }

    if (afterCancelDeadline && !isLateCancellation) {
      if (text.length > 0) {
        text += ' ';
      }
      text +=
        "Cancellation isn't possible anymore without having to pay the full costs of ";
      text += `€${data.fine}. Also note that you will be unable to re-register.`;
    }

    if (text.length > 0) {
      return <Text style={styles.registrationText}>{text}</Text>;
    }
    return <View />;
  };

  eventActions = () => {
    const { data, register, openUrl } = this.props;

    const {
      registrationRequired,
      registrationStarted,
      registrationAllowed,
    } = this.eventProperties();

    if (registrationAllowed) {
      if (data.user_registration === null || data.user_registration.is_cancelled) {
        const text =
          data.max_participants && data.max_participants <= data.num_participants
            ? 'Put me on the waiting list'
            : 'Register';
        return (
          <View>
            <Text style={styles.registrationText}>
              By registering, you confirm that you have read the
              <Text
                style={styles.termsUrl}
                onPress={() => openUrl(termsAndConditionsUrl)}
              >
                {' '}
                {'terms and conditions'}{' '}
              </Text>
              , that you understand them and that you agree to be bound by them.
            </Text>
            <View style={styles.registrationActions}>
              <Button
                color={Colors.magenta}
                title={text}
                onPress={() => register(data.pk)}
              />
            </View>
          </View>
        );
      }
      if (
        data.user_registration &&
        !data.user_registration.is_cancelled &&
        registrationRequired &&
        registrationStarted
      ) {
        if (
          registrationStarted &&
          data.user_registration &&
          !data.user_registration.is_cancelled &&
          data.has_fields
        ) {
          return (
            <View style={styles.registrationActions}>
              <Button
                onPress={() => this.props.fields(data.user_registration.pk)}
                title='Update registration'
              />
              <View style={styles.secondButtonMargin}>
                <Button
                  title='Cancel registration'
                  onPress={() => this.cancelPrompt(data.user_registration.pk)}
                />
              </View>
            </View>
          );
        }
        return (
          <View style={styles.registrationActions}>
            <Button
              title='Cancel registration'
              onPress={() => this.cancelPrompt(data.user_registration.pk)}
            />
          </View>
        );
      }
    }

    return <View />;
  };

  registrationsGrid = () => {
    const { registrations } = this.props;
    if (registrations !== undefined && registrations.length > 0) {
      return (
        <View>
          <View style={styles.divider} />
          <Text style={styles.registrationsTitle}>Registrations</Text>
          <FlatList
            numColumns={3}
            data={registrations}
            renderItem={(item) => (
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
            keyExtractor={(item) => item.pk}
          />
        </View>
      );
    }
    return <View />;
  };

  handleRefresh = () => {
    const { refresh, data } = this.props;
    refresh(data.pk);
  };

  render() {
    const {
      status,
      loading,
      openMaps,
      data,
      openAdmin,
      openUrl,
      addToCalendar,
    } = this.props;

    const addCalendarButton = (
      <TouchableOpacity
        onPress={() =>
          addToCalendar(
            this.props.data.title,
            this.props.data.location,
            this.props.data.start,
            this.props.data.end
          )
        }
      >
        <CommunityIcon name='calendar-export' style={styles.calendarIcon} size={24} />
      </TouchableOpacity>
    );

    const shareButton = (
      <TouchableOpacity
        onPress={() =>
          Share.open({
            message: this.props.data.title,
            url: `${serverUrl}/events/${this.props.data.pk}/`,
          })
        }
      >
        <Icon name='share' style={styles.shareIcon} size={24} />
      </TouchableOpacity>
    );

    const adminButton = (
      <TouchableOpacity onPress={() => openAdmin(data.pk)}>
        <Icon name='settings' style={styles.adminIcon} size={24} />
      </TouchableOpacity>
    );

    const hasAdminView =
      data.is_admin &&
      (data.registration_start !== null || data.registration_end !== null);

    const rightView = (
      <View style={styles.rightView}>
        {addCalendarButton}
        {shareButton}
        {hasAdminView && adminButton}
      </View>
    );

    if (status === 'initial') {
      return (
        <View style={styles.rootWrapper}>
          <StandardHeader />
          <LoadingScreen />
        </View>
      );
    }

    const fontStyles = {
      fontSize: 14,
      lineHeight: 24.0,
      color: Colors.black,
    };

    const linkStyles = {
      color: Colors.magenta,
    };

    if (status === 'success') {
      return (
        <View style={styles.rootWrapper}>
          <StandardHeader rightView={rightView} />
          <ScrollView
            backgroundColor={Colors.background}
            contentContainerStyle={styles.eventView}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.handleRefresh} />
            }
          >
            <TouchableHighlight
              onPress={() => openMaps(data.map_location)}
              style={styles.locationImageWrapper}
            >
              <Image
                style={styles.locationImage}
                source={{ uri: data.google_maps_url }}
              />
            </TouchableHighlight>
            <Text style={styles.titleText}>{data.title}</Text>
            {this.eventDesc()}
            {this.eventActions()}
            {this.eventInfo()}
            <View style={styles.divider} />
            <HTML
              html={data.description}
              onLinkPress={(event, href) => openUrl(href)}
              baseFontStyle={fontStyles}
              tagsStyles={{
                a: linkStyles,
              }}
            />
            {this.registrationsGrid()}
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.rootWrapper}>
        <StandardHeader />
        <ScrollView
          backgroundColor={Colors.background}
          contentContainerStyle={styles.flex}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.handleRefresh} />
          }
        >
          <ErrorScreen message='Could not load the event...' />
        </ScrollView>
      </View>
    );
  }
}

EventScreen.propTypes = {
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
    google_maps_url: PropTypes.string.isRequired,
    is_admin: PropTypes.bool.isRequired,
  }).isRequired,
  registrations: PropTypes.arrayOf(
    PropTypes.shape({
      pk: PropTypes.number.isRequired,
      member: PropTypes.number,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        full: PropTypes.string.isRequired,
        large: PropTypes.string.isRequired,
        medium: PropTypes.string.isRequired,
        small: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  fields: PropTypes.func.isRequired,
  openMaps: PropTypes.func.isRequired,
  retrievePizzaInfo: PropTypes.func.isRequired,
  openAdmin: PropTypes.func.isRequired,
  openUrl: PropTypes.func.isRequired,
  addToCalendar: PropTypes.func.isRequired,
};

export default EventScreen;
