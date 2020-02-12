import { connect } from 'react-redux';
import * as navigationActions from '../../../actions/navigation';
import AdminScreen from './AdminScreen';

const mapDispatchToProps = {
  goBack: navigationActions.goBack,
};

export default connect(() => ({}), mapDispatchToProps)(AdminScreen);
