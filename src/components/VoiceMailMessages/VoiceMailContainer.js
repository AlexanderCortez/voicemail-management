import { connect } from 'react-redux';
import { values } from 'lodash';
import { fetchMessages, changeMessageStatus } from '../../actions/VoiceMailActions';
import VoiceMailMessagesComponent from './VoiceMailMessagesComponent';

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => dispatch(fetchMessages()),
  changeMessageStatus: (messageId, status) => dispatch(changeMessageStatus(messageId, status)),
});

const mapStateToProps = (state) => ({
  messages: values(state.VoiceMailReducer.messages),
  loadingFetch: state.VoiceMailReducer.loadingFetch,
  statusChange: state.VoiceMailReducer.statusChange,
});

export default connect(mapStateToProps, mapDispatchToProps)(VoiceMailMessagesComponent);
