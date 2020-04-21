import { connect } from 'react-redux';
import { fetchMessages } from '../../actions/VoiceMailActions';
import VoiceMailMessagesComponent from './VoiceMailMessagesComponent';

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => dispatch(fetchMessages()),
});

const mapStateToProps = (state) => ({
  data: state.VoiceMailReducer.messages,
});

export default connect(mapStateToProps, mapDispatchToProps)(VoiceMailMessagesComponent);
