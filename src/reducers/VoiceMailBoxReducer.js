import {
  LOADING_FETCH_VMBOXES,
  STOP_LOADING_FETCH_VMBOXES,
  SUCCESS_FETCH_VMBOXES,
} from '../actionTypes/VoiceMailBoxTypes';

const initialState = {
  vmBoxes: {},
  loadingFetch: false,
};

const VoiceMailBoxReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === SUCCESS_FETCH_VMBOXES) {
    return {
      ...state,
      vmBoxes: payload,
    };
  }
  if (type === LOADING_FETCH_VMBOXES) {
    return {
      ...state,
      loadingFetch: true,
    };
  }
  if (type === STOP_LOADING_FETCH_VMBOXES) {
    return {
      ...state,
      loadingFetch: false,
    };
  }
  return state;
};

export default VoiceMailBoxReducer;
