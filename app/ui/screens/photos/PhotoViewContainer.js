import { connect } from 'react-redux';
import PhotoView from './PhotoView';
import { tokenSelector } from '../../../utils/url';

const mapStateToProps = state => ({
  token: tokenSelector(state),
});

export default connect(mapStateToProps)(PhotoView);
