import { connect } from 'react-redux';
import { values } from 'lodash';
import { fetchMessages, changeMessageStatus } from '../../actions/VoiceMailActions';
import VoiceMailMessagesComponent from './VoiceMailMessagesComponent';
import { setCurrentVoiceMailBox, getVoiceMailBoxes } from '../../actions/VoiceMailBoxActions';

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => dispatch(fetchMessages()),
  getVoiceMailBoxes: () => dispatch(getVoiceMailBoxes()),
  changeMessageStatus: (messageId, status) => dispatch(changeMessageStatus(messageId, status)),
  setCurrentVoiceMailBox: (vmBoxId) => dispatch(setCurrentVoiceMailBox(vmBoxId)),
});

const mapStateToProps = (state) => {
  const {
    messages,
    currentVoiceMailBox,
    loadingFetch,
    statusChange,
  } = state.VoiceMailReducer;
  return {
    messages: values(messages[currentVoiceMailBox.id]),
    loadingFetch,
    statusChange,
    currentVoiceMailBox,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VoiceMailMessagesComponent);
