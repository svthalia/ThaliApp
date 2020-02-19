import React from 'react';
import { withTranslation } from 'react-i18next';
import {
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style/BugReportScreen';
import { withStandardHeader } from '../../components/standardHeader/StandardHeader';
import Button from '../../components/button/Button';
import Colors from '../../style/Colors';

class BugReportScreen extends React.Component {
  render() {
    const { t, reportBug } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
        >
          <View style={styles.content}>
            <View style={styles.categoryContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.label}>
                  Title
                </Text>
                <TextInput
                  onChangeText={title => this.setState({ title })}
                  keyboardType="default"
                  placeholder={t('Title of the bug')}
                  style={styles.fieldInputLine}
                />
                <Text style={[styles.label, styles.borderTop]}>
                  Description
                </Text>
                <TextInput
                  onChangeText={description => this.setState({ description })}
                  keyboardType="default"
                  placeholder={t('Description of the bug (in English)')}
                  style={styles.fieldInput}
                  multiline
                />
                <View style={styles.buttonView}>
                  <Button
                    title={t('Report bug')}
                    color={Colors.magenta}
                    onPress={() => {
                      reportBug(this.state.title, this.state.description);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

BugReportScreen.propTypes = {
  t: PropTypes.func.isRequired,
  reportBug: PropTypes.func.isRequired,
};

export default withTranslation('ui/screens/settings/BugReportScreen')(withStandardHeader(BugReportScreen, false));
