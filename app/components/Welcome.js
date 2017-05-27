import React, { Component } from 'react';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/nl';
import EventDetailCard from './EventDetailCard';

import { retrieveShortlist } from '../actions/login';
import { navigate } from '../actions/navigation';
import styles from './style/welcome';

const eventListToSections = (eventLists) => {
  Moment.locale('nl');
  return eventLists.map(eventList => ({
    key: Moment(eventList[0].start).calendar(null, {
      sameDay: '[Vandaag]',
      nextDay: '[Morgen]',
      nextWeek: 'dddd D MMMM',
      lastDay: '[Gisteren]',
      lastWeek: 'dddd D MMMM',
      sameElse: 'dddd D MMMM',
    }),
    data: eventList,
  }));
};

const Footer = props => (
  <TouchableOpacity
    onPress={() => props.navigate('eventList')}
    style={styles.footer}
  >
    <Text style={styles.footerText}>BEKIJK DE GEHELE AGENDA</Text>
  </TouchableOpacity>
);

Footer.propTypes = {
  navigate: React.PropTypes.func.isRequired,
};

const mapDispatchToPropsFooter = dispatch => ({
  navigate: scene => dispatch(navigate(scene)),
});

const FooterComponent = connect(() => ({}), mapDispatchToPropsFooter)(Footer);

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.props.retrieveShortlist(this.props.token)
      .then(() => this.setState({ refreshing: false }));
  };

  render() {
    if (this.props.eventList.length === 0) {
      return (
        <View>
          <Text>
            No events found!
          </Text>
        </View>
      );
    }
    return (
      <View>
        <SectionList
          style={styles.sectionList}
          renderItem={item => <EventDetailCard event={item.item} />}
          renderSectionHeader={
            itemHeader => <Text style={styles.sectionHeader}>{itemHeader.section.key}</Text>
          }
          sections={eventListToSections(this.props.eventList)}
          keyExtractor={event => event.pk}
          stickySectionHeadersEnabled
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          ListFooterComponent={FooterComponent}
        />
      </View>
    );
  }
}

Welcome.propTypes = {
  eventList: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    start: React.PropTypes.string,
    end: React.PropTypes.string,
    location: React.PropTypes.string,
    price: React.PropTypes.string,
    pk: React.PropTypes.number,
    registered: React.PropTypes.bool,
    pizza: React.PropTypes.bool,
  }))).isRequired,
  token: React.PropTypes.string.isRequired,
  retrieveShortlist: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  eventList: state.welcome.eventList,
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  retrieveShortlist: token => dispatch(retrieveShortlist(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
