import React from 'react';
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

const Event = (props) => {
  if (props.success) {
    const eventDesc = (data) => {
      const startDate = Moment(data.start).format('D MMM YYYY, HH:mm');
      const endDate = Moment(data.end).format('D MMM YYYY, HH:mm');

      let text = '';

      text += `Van: ${startDate}\n`;
      text += `Tot: ${endDate}\n`;
      text += `Locatie: ${data.location}\n`;
      text += `Prijs: €${data.price}\n`;
      if (data.status > REGISTRATION_NOT_NEEDED) {
        const registrationDeadline = Moment(data.registration_end).format('D MMM YYYY, HH:m');
        const cancelDeadline = Moment(data.cancel_deadline).format('D MMM YYYY, HH:m');

        text += `Aanmelddeadline: ${registrationDeadline}\n`;
        text += `Afmelddeadline: ${cancelDeadline}\n`;
        text += `Aantal aanmeldingen: ${data.num_participants} aanmeldingen`;
        if (data.max_participants) {
          text += ` (${data.max_participants} max)`;
        }
        text += '\n';

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

          text += `Aanmeldstatus: ${registrationState}`;
        }
      }

      return text;
    };

    const eventInfo = (event) => {
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
    const eventActions = () => {
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

    const registrationsGrid = (registrations) => {
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
              { props.registrations.map((item, index) => {
                if (index % 3 === 0) {
                  return props.registrations.slice(index, index + 3);
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

    return (
      <ScrollView backgroundColor={colors.background} contentContainerStyle={styles.eventView}>
        <Image style={styles.locationImage} source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${props.data.map_location}&zoom=13&size=450x250&markers=${props.data.map_location}` }} />
        <Text style={styles.titleText}>{props.data.title}</Text>
        <Text style={styles.infoText}>
          {eventDesc(props.data)}
        </Text>
        {eventActions(props.data)}
        {eventInfo(props.data)}
        <View style={styles.divider} />
        <Text style={styles.descText}>{props.data.description}</Text>
        {registrationsGrid(props.registrations)}
      </ScrollView>
    );
  }
  return (
    <ScrollView backgroundColor={colors.background} contentContainerStyle={styles.eventView}>
      <Text>Kon het evenement niet laden...</Text>
    </ScrollView>
  );
};

Event.propTypes = {
  data: React.PropTypes.shape({
    pk: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    start: React.PropTypes.string.isRequired,
    end: React.PropTypes.string.isRequired,
    organiser: React.PropTypes.number.isRequired,
    location: React.PropTypes.string.isRequired,
    map_location: React.PropTypes.string.isRequired,
    status: React.PropTypes.number.isRequired,
    registration_allowed: React.PropTypes.bool.isRequired,
    has_fields: React.PropTypes.bool.isRequired,
    registration_start: React.PropTypes.string,
    registration_end: React.PropTypes.string,
    cancel_deadline: React.PropTypes.string,
    max_participants: React.PropTypes.number,
    num_participants: React.PropTypes.number,
    price: React.PropTypes.string,
    fine: React.PropTypes.string,
    user_registration: React.PropTypes.shape({
      registered_on: React.PropTypes.string,
      queue_position: React.PropTypes.number,
      is_cancelled: React.PropTypes.bool,
      is_late_cancellation: React.PropTypes.bool,
    }),
    no_registration_message: React.PropTypes.string,
  }).isRequired,
  registrations: React.PropTypes.arrayOf(React.PropTypes.shape({
    pk: React.PropTypes.number.isRequired,
    member: React.PropTypes.number,
    name: React.PropTypes.string.isRequired,
  })).isRequired,
  success: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  data: state.events.data,
  registrations: state.events.registrations,
  success: state.events.success,
});

export default connect(mapStateToProps, () => ({}))(Event);
