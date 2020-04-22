import { FETCH_MESSAGES } from '../actionTypes/VoiceMailTypes';

const initialState = {
  messages: {},
};

const VoiceMailReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_MESSAGES) {
    return {
      ...state,
      messages: payload,
    };
  }
  return state;
};

export default VoiceMailReducer;
