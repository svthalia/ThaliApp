import { connect } from 'react-redux';
import PhotoListItem from './PhotoListItem';
import { tokenSelector } from '../../../utils/url';

const mapStateToProps = state => ({
  token: tokenSelector(state),
});

export default connect(mapStateToProps)(PhotoListItem);
