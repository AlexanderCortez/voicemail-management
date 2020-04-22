import { combineReducers } from 'redux';
import VoiceMailReducer from './VoiceMailReducer';
import VoiceMailBoxReducer from './VoiceMailBoxReducer';

export default combineReducers({
  VoiceMailReducer,
  VoiceMailBoxReducer,
});
