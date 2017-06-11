import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/nl';

import styles from './style/event';
import MemberView from './MemberView';
import { colors } from '../style';

const REGISTRATION_NOT_NEEDED = -1;
const REGISTRATION_NOT_YET_OPEN = 0;
// eslint-disable-next-line no-unused-vars
const REGISTRATION_OPEN = 1;
const REGISTRATION_OPEN_NO_CANCEL = 2;
const REGISTRATION_CLOSED = 3;
const REGISTRATION_CLOSED_CANCEL_ONLY = 4;

class Event extends Component {
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

    if (data.status > REGISTRATION_NOT_NEEDED) {
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
    if (event.status === REGISTRATION_NOT_YET_OPEN) {
      const registrationStart = Moment(event.registration_start).format('D MMM YYYY, HH:m');
      text = `Aanmelden opent ${registrationStart}`;
    } else if (event.status === REGISTRATION_CLOSED ||
        event.status === REGISTRATION_CLOSED_CANCEL_ONLY) {
      text = 'Aanmelden is niet meer mogelijk';
    } else if (event.status === REGISTRATION_NOT_NEEDED) {
      text = 'Geen aanmelding vereist';
      if (event.no_registration_message) {
        text = event.no_registration_message;
      }
    }

    if ((event.status === REGISTRATION_OPEN_NO_CANCEL || event.status === REGISTRATION_CLOSED) &&
        event.user_registration !== null &&
        !event.user_registration.is_cancelled && event.fine > 0 &&
        event.user_registration.queue_position === null) {
      text += `Afmelden is niet meer mogelijk zonder de volledige kosten van €${event.fine} te ` +
        'betalen. Let op: je kunt je hierna niet meer aanmelden.';
    }

    if (text.length > 0) {
      return (<Text style={styles.registrationText}>{text}</Text>);
    }
    return (<View />);
  };

  // eslint-disable-next-line arrow-body-style
  eventActions = () => {
    // Needed once registration on server implemented
    // if (event.registration_allowed) {
    //   if ((event.user_registration === null || event.user_registration.is_cancelled) &&
    //     (event.status === REGISTRATION_OPEN || event.status === REGISTRATION_OPEN_NO_CANCEL)) {
    //     const text = event.max_participants < event.num_participants ?
    //                  'Aanmelden' : 'Zet me op de wachtlijst';
    //     return (
    //       <View style={styles.registrationActions}>
    //         <Button color={colors.magenta} title={text} onPress={() => {}} />
    //       </View>
    //     );
    //   } else if (event.user_registration && !event.user_registration.is_cancelled &&
    //     event.status !== REGISTRATION_NOT_NEEDED && event.status !== REGISTRATION_NOT_YET_OPEN) {
    //     if ((event.status === REGISTRATION_OPEN || event.status === REGISTRATION_OPEN_NO_CANCEL)
    //       && event.user_registration && !event.user_registration.is_cancelled
    //       && event.has_fields) {
    //       return (
    //         <View style={styles.registrationActions}>
    //           <Button
    //             color={colors.magenta} title="Aanmelding bijwerken" onPress={() => {}}
    //           />
    //           <View style={styles.secondButtonMargin}>
    //             <Button color={colors.magenta} title="Afmelden" onPress={() => {}} />
    //           </View>
    //         </View>
    //       );
    //     }
    //     return (
    //       <View style={styles.registrationActions}>
    //         <Button color={colors.magenta} title="Afmelden" onPress={() => {}} />
    //       </View>
    //     );
    //   }
    // }

    return (<View />);
  };

  registrationsGrid = (registrations) => {
    if (registrations !== undefined && registrations.length > 0) {
      return (
        <View>
          <View style={styles.divider} />
          <Text style={styles.registrationsTitle}>Aanmeldingen</Text>
          <View style={styles.registrationsView}>
            {/*
                Create a grid for the registrations:
                First create chunks of max 3 and map those to a View
                Then inside that View create 3 MemberViews (if is a real registration) or
                a placeholder View (to make sure flex space is filled)
              */}
            { this.props.registrations.map((item, index) => {
              if (index % 3 === 0) {
                return this.props.registrations.slice(index, index + 3);
              }
              return null;
            }).filter(item => item)
                .map((list) => {
                  while (list.length < 3) {
                    list.push({ pk: null });
                  }

                  const key = list[0].pk.toString().concat(list[1].pk, list[2].pk);
                  return (
                    <View key={key} style={styles.registrationsRow}>
                      {list.map((reg, i) => {
                        const style = i === 1 ? styles.registrationsItemMargin :
                          styles.registrationsItem;
                        if (reg.name) {
                          return (
                            <MemberView key={key + i.toString()} member={reg} style={style} />
                          );
                        }
                        return (
                          <View key={key + i.toString()} style={style} />
                        );
                      })}
                    </View>
                  );
                })
              }
          </View>
        </View>
      );
    }
    return (<View />);
  };

  render() {
    if (this.props.success) {
      return (
        <ScrollView backgroundColor={colors.background} contentContainerStyle={styles.eventView}>
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
      <ScrollView backgroundColor={colors.background} contentContainerStyle={styles.eventView}>
        <Text>Kon het evenement niet laden...</Text>
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
    status: PropTypes.number.isRequired,
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
  success: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  data: state.events.data,
  registrations: state.events.registrations,
  success: state.events.success,
});

export default connect(mapStateToProps, () => ({}))(Event);
