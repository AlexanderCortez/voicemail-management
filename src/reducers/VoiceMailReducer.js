import { get } from 'lodash';
import {
  FETCH_MESSAGES,
  LOADING_FETCH_MESSAGES,
  STOP_LOADING_FETCH_MESSAGES,
  LOADING_CHANGE_MESSAGE_STATUS,
  STOP_CHANGE_MESSAGE_STATUS,
  SUCCESS_CHANGE_MESSAGE_STATUS,
} from '../actionTypes/VoiceMailTypes';

const initialState = {
  messages: {},
  loadingFetch: false,
  statusChange: {},
};

const VoiceMailReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_MESSAGES) {
    return {
      ...state,
      messages: payload,
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
    const messageId = get(payload, 'media_id');
    return {
      ...state,
      messages: {
        ...state.messages,
        [messageId]: payload,
      },
    };
  }
  return state;
};

export default VoiceMailReducer;
