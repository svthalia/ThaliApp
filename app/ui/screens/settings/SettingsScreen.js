import React from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style/Settings';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import NotificationsSection from './NotificationsSectionConnector';
import { withStandardHeader } from '../../components/standardHeader/StandardHeader';


class SettingsScreen extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
        >
          <View style={styles.content}>
            <NotificationsSection />
          </View>
        </ScrollView>
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  init: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withStandardHeader(SettingsScreen, true);
