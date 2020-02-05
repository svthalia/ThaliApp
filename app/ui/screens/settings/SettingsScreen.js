import React from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import styles from './style/Settings';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import NotificationsSection from './NotificationsSectionConnector';
import { withStandardHeader } from '../../components/standardHeader/StandardHeader';
import Colors from '../../style/Colors';
import Button from '../../components/button/Button';


class SettingsScreen extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { loading, openReportBug, t } = this.props;

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
            <Button
              color={Colors.magenta}
              title={t('Report a bug')}
              onPress={openReportBug}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  init: PropTypes.func.isRequired,
  openReportBug: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withTranslation('ui/screens/settings/SettingsScreen')(withStandardHeader(SettingsScreen, true));
