import { connect } from 'react-redux';
import * as navigationActions from '../../../actions/navigation';
import SearchHeader from './SearchHeader';

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(navigationActions.toggleDrawer()),
});

export default connect(() => ({}), mapDispatchToProps)(SearchHeader);
