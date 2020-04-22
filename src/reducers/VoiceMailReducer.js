import { get } from 'lodash';
import {
  FETCH_MESSAGES,
  LOADING_FETCH_MESSAGES,
  STOP_LOADING_FETCH_MESSAGES,
  LOADING_CHANGE_MESSAGE_STATUS,
  STOP_CHANGE_MESSAGE_STATUS,
  SUCCESS_CHANGE_MESSAGE_STATUS,
  SET_CURRENT_VOICEMAIL_BOX,
} from '../actionTypes/VoiceMailTypes';

const initialState = {
  messages: {},
  loadingFetch: true,
  statusChange: {},
  currentVoiceMailBox: {},
};

const VoiceMailReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === SET_CURRENT_VOICEMAIL_BOX) {
    return {
      ...state,
      currentVoiceMailBox: payload,
    };
  }
  if (type === FETCH_MESSAGES) {
    return {
      ...state,
      messages: {
        ...state.messages,
        [payload.vmBoxId]: payload.messages,
      },
    };
  }
  if (type === LOADING_FETCH_MESSAGES) {
    return {
      ...state,
      loadingFetch: true,
    };
  }
  if (type === STOP_LOADING_FETCH_MESSAGES) {
    return {
      ...state,
      loadingFetch: false,
    };
  }
  if (type === LOADING_CHANGE_MESSAGE_STATUS) {
    return {
      ...state,
      statusChange: {
        ...state.statusChange,
        [payload]: {
          loading: true,
        },
      },
    };
  }
  if (type === STOP_CHANGE_MESSAGE_STATUS) {
    return {
      ...state,
      statusChange: {
        ...state.statusChange,
        [payload]: {
          loading: false,
        },
      },
    };
  }
  if (type === SUCCESS_CHANGE_MESSAGE_STATUS) {
    const messageId = get(payload.data, 'media_id');
    return {
      ...state,
      messages: {
        ...state.messages,
        [payload.vmBoxId]: {
          ...state.messages[payload.vmBoxId],
          [messageId]: payload.data,
        },
      },
    };
  }
  return state;
};

export default VoiceMailReducer;
