import { connect } from 'react-redux';
import * as navigationActions from '../../../actions/navigation';
import SearchHeader from './SearchHeader';

const mapDispatchToProps = (dispatch, ownProps) => ({
  leftIconAction: ownProps.leftIconAction || (() => dispatch(navigationActions.toggleDrawer())),
});

export default connect(() => ({}), mapDispatchToProps)(SearchHeader);
