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
import { translate } from 'react-i18next';
import Moment from 'moment';
import HTML from 'react-native-render-html';
import Share from 'react-native-share';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles, { memberSize } from './style/EventScreen';
import MemberView from '../../components/memberView/MemberViewContainer';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import Colors from '../../style/Colors';

import { termsAndConditionsUrl, url as serverUrl } from '../../../utils/url';
import Button from '../../components/button/Button';
import StandardHeader from '../../components/standardHeader/StandardHeader';

class EventScreen extends Component {
  cancelPrompt = (pk) => {
    const { data, t, cancel } = this.props;
    const cancelDeadlineDate = new Date(data.cancel_deadline);
    let message = t('Are you sure you want to cancel your registration?');
    if (data.cancel_deadline !== null && cancelDeadlineDate <= new Date()) {
      message = t('The deadline has passed, are you sure you want to cancel your \
registration and pay the full costs of €{{ fine }}? You will not be able to undo this!',
      { fine: data.fine });
    }
    return Alert.alert(
      t('Cancel registration?'),
      message,
      [
        { text: t('No') },
        { text: t('Yes'), onPress: () => cancel(pk) },
      ],
    );
  };

  eventProperties = () => {
    const { data } = this.props;

    const nowDate = new Date();
    const startRegDate = new Date(data.registration_start);
    const endRegDate = new Date(data.registration_end);
    const cancelDeadlineDate = new Date(data.cancel_deadline);

    const registrationRequired = data.registration_start !== null || data.registration_end !== null;
    const registrationStarted = startRegDate <= nowDate;
    const isLateCancellation = data.user_registration
      && data.user_registration.is_late_cancellation;

    const registrationAllowed = registrationRequired && endRegDate > nowDate
      && registrationStarted && data.registration_allowed
      && !isLateCancellation;

    const afterCancelDeadline = data.cancel_deadline !== null && cancelDeadlineDate <= nowDate;

    return {
      registrationRequired,
      registrationStarted,
      isLateCancellation,
      registrationAllowed,
      afterCancelDeadline,
    };
  };

  eventDesc = () => {
    const { t, data } = this.props;

    const startDate = Moment(data.start).format('D MMM YYYY, HH:mm');
    const endDate = Moment(data.end).format('D MMM YYYY, HH:mm');

    const infoTexts = [];

    infoTexts.push(
      <View key="start-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="start-title">
          {t('From')}
:
        </Text>
        <Text style={styles.infoValueText} key="start-value">
          {startDate}
        </Text>
      </View>,
    );
    infoTexts.push(
      <View key="end-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="end-title">
          {t('Until')}
:
        </Text>
        <Text style={styles.infoValueText} key="end-value">
          {endDate}
        </Text>
      </View>,
    );
    infoTexts.push(
      <View key="loc-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="loc-title">
          {t('Location')}
:
        </Text>
        <Text style={styles.infoValueText} key="loc-value">
          {data.location}
        </Text>
      </View>,
    );
    infoTexts.push(
      <View key="price-holder" style={styles.infoHolder}>
        <Text style={styles.infoText} key="price-title">
          {t('Price')}
:
        </Text>
        <Text style={styles.infoValueText} key="price-value">
€
          {data.price}
        </Text>
      </View>,
    );

    const { registrationRequired } = this.eventProperties();
    if (registrationRequired) {
      const registrationDeadline = Moment(data.registration_end).format('D MMM YYYY, HH:mm');
      const cancelDeadline = Moment(data.cancel_deadline).format('D MMM YYYY, HH:mm');

      infoTexts.push(
        <View key="registrationend-holder" style={styles.infoHolder}>
          <Text style={styles.infoText} key="registrationend-title">
            {t('Registration deadline')}
:
          </Text>
          <Text style={styles.infoValueText} key="registrationend-value">
            {registrationDeadline}
          </Text>
        </View>,
      );
      infoTexts.push(
        <View key="canceldeadline-holder" style={styles.infoHolder}>
          <Text style={styles.infoText} key="canceldeadline-title">
            {t('Cancellation deadline')}
:
          </Text>
          <Text style={styles.infoValueText} key="canceldeadline-value">
            {cancelDeadline}
          </Text>
        </View>,
      );

      let participantsText = `${data.num_participants} ${t('registrations')}`;
      if (data.max_participants) {
        participantsText += ` (${data.max_participants} ${t('max')})`;
      }

      infoTexts.push(
        <View key="participants-holder" style={styles.infoHolder}>
          <Text style={styles.infoText} key="participants-title">
            {t('Number of registrations')}
:
          </Text>
          <Text style={styles.infoValueText} key="participants-value">
            {participantsText}
          </Text>
        </View>,
      );

      if (data.user_registration) {
        let registrationState;
        if (data.user_registration.is_late_cancellation) {
          registrationState = t('Your registration is cancelled after the cancellation deadline');
        } else if (data.user_registration.is_cancelled) {
          registrationState = t('Your registration is cancelled');
        } else if (data.user_registration.queue_position === null) {
          registrationState = t('You are registered');
        } else if (data.user_registration.queue_position > 0) {
          registrationState = t('Queue position {{pos}}', { pos: data.user_registration.queue_position });
        } else {
          registrationState = t('Your registration is cancelled');
        }

        infoTexts.push(
          <View key="status-holder" style={styles.infoHolder}>
            <Text style={styles.infoText} key="status-title">
              {t('Registration status')}
:
            </Text>
            <Text style={styles.infoValueText} key="status-value">
              {registrationState}
            </Text>
          </View>,
        );
      }
    }

    if (data.is_pizza_event) {
      infoTexts.push(
        <View key="pizza-holder" style={styles.pizzaHolder}>
          <Text style={styles.pizzaText} key="pizza-title">
            Pizza:
          </Text>
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

  eventInfo = () => {
    const { data, t } = this.props;
    let text = '';

    const {
      registrationRequired,
      registrationStarted,
      registrationAllowed,
      isLateCancellation,
      afterCancelDeadline,
    } = this.eventProperties();

    if (!registrationRequired) {
      text = t('No registration required.');
      if (data.no_registration_message) {
        text = data.no_registration_message;
      }
    } else if (!registrationStarted) {
      const registrationStart = Moment(data.registration_start).format('D MMM YYYY, HH:mm');
      text = t('Registration will open {{start}}', { start: registrationStart });
    } else if (!registrationAllowed) {
      text = t('Registration is not possible anymore.');
    } else if (isLateCancellation) {
      text = t('Registration is not allowed anymore, as you cancelled your registration after the deadline.');
    }

    if (afterCancelDeadline && !isLateCancellation) {
      if (text.length > 0) {
        text += ' ';
      }
      text += t(
        'Cancellation isn\'t possible anymore without having to pay the full \
costs of €{{fine}}. Also note that you will be unable to re-register.',
        { fine: data.fine },
      );
    }

    if (text.length > 0) {
      return (
        <Text style={styles.registrationText}>
          {text}
        </Text>
      );
    }
    return (<View />);
  };

  eventActions = () => {
    const {
      data, register, t, openUrl,
    } = this.props;

    const {
      registrationRequired,
      registrationStarted,
      registrationAllowed,
    } = this.eventProperties();

    if (registrationAllowed) {
      if (data.user_registration === null || data.user_registration.is_cancelled) {
        const text = data.max_participants && data.max_participants <= data.num_participants
          ? t('Put me on the waiting list') : t('Register');
        return (
          <View>
            <Text style={styles.registrationText}>
              {t('By registering, you confirm that you have read the')}
              <Text
                style={styles.termsUrl}
                onPress={() => openUrl(termsAndConditionsUrl)}
              >
                {' '}
                {t('terms and conditions')}
                {' '}

              </Text>
              {t(', that you understand them and that you agree to be bound by them.')}
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
      } if (data.user_registration && !data.user_registration.is_cancelled
                 && registrationRequired && registrationStarted) {
        if (registrationStarted && data.user_registration && !data.user_registration.is_cancelled
            && data.has_fields) {
          return (
            <View style={styles.registrationActions}>
              <Button
                onPress={() => this.props.fields(data.user_registration.pk)}
                title={t('Update registration')}
              />
              <View style={styles.secondButtonMargin}>
                <Button
                  title={t('Cancel registration')}
                  onPress={() => this.cancelPrompt(data.user_registration.pk)}
                />
              </View>
            </View>
          );
        }
        return (
          <View style={styles.registrationActions}>
            <Button title={t('Cancel registration')} onPress={() => this.cancelPrompt(data.user_registration.pk)} />
          </View>
        );
      }
    }

    return (<View />);
  };

  registrationsGrid = () => {
    const { registrations, t } = this.props;
    if (registrations !== undefined && registrations.length > 0) {
      return (
        <View>
          <View style={styles.divider} />
          <Text style={styles.registrationsTitle}>
            {t('Registrations')}
          </Text>
          <FlatList
            numColumns={3}
            data={registrations}
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
    const { refresh, data } = this.props;
    refresh(data.pk);
  };

  render() {
    const {
      status, loading, openMaps, data, t, openAdmin, openUrl,
    } = this.props;

    const shareButton = (
      <TouchableOpacity
        onPress={() => Share.open({
          message: this.props.data.title,
          url: `${serverUrl}/events/${this.props.data.pk}/`,
        })}
      >
        <Icon
          name="share"
          style={styles.shareIcon}
          size={24}
        />
      </TouchableOpacity>
    );

    const adminButton = (
      <TouchableOpacity
        onPress={() => openAdmin(data.pk)}
      >
        <Icon
          name="settings"
          style={styles.adminIcon}
          size={24}
        />
      </TouchableOpacity>
    );

    const hasAdminView = data.is_admin
      && (data.registration_start !== null || data.registration_end !== null);

    const rightView = (
      <View style={styles.rightView}>
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
            refreshControl={(
              <RefreshControl
                refreshing={loading}
                onRefresh={this.handleRefresh}
              />
            )}
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
            <Text style={styles.titleText}>
              {data.title}
            </Text>
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
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={this.handleRefresh}
            />
          )}
        >
          <ErrorScreen message={t('Could not load the event...')} />
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
  openAdmin: PropTypes.func.isRequired,
  openUrl: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('screens/events/EventScreen')(EventScreen);
