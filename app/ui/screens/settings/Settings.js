import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './style/Settings';

import { settingsActions } from '../../../actions/settings';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import NotificationsSection from './NotificationsSection';


class Settings extends React.Component {
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

Settings.propTypes = {
  init: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.settings.loading,
});

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(settingsActions.initStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
