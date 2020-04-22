import { connect } from 'react-redux';
import { values } from 'lodash';
import { getVoiceMailBoxes, redirectToMessages } from '../../actions/VoiceMailBoxActions';
import VoiceMailBoxComponent from './VoiceMailBoxComponent';

const mapDispatchToProps = (dispatch) => ({
  getVoiceMailBoxes: () => dispatch(getVoiceMailBoxes()),
  redirectToMessages: (history, data) => dispatch(redirectToMessages(history, data)),
});

const mapStateToProps = (state) => ({
  loadingFetch: state.VoiceMailBoxReducer.loadingFetch,
  vmBoxes: values(state.VoiceMailBoxReducer.vmBoxes),
});

export default connect(mapStateToProps, mapDispatchToProps)(VoiceMailBoxComponent);
