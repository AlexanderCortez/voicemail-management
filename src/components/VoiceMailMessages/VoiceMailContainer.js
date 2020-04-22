import { connect } from 'react-redux';
import { values } from 'lodash';
import { fetchMessages } from '../../actions/VoiceMailActions';
import VoiceMailMessagesComponent from './VoiceMailMessagesComponent';

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => dispatch(fetchMessages()),
});

const mapStateToProps = (state) => ({
  messages: values(state.VoiceMailReducer.messages),
});

export default connect(mapStateToProps, mapDispatchToProps)(VoiceMailMessagesComponent);
