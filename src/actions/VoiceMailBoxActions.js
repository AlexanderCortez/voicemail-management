import axios from 'axios';
import { keyBy, size, find } from 'lodash';
import { getAction, goTo } from './AppActions';
import {
  LOADING_FETCH_VMBOXES,
  SUCCESS_FETCH_VMBOXES,
  STOP_LOADING_FETCH_VMBOXES,
} from '../actionTypes/VoiceMailBoxTypes';
import { SET_CURRENT_VOICEMAIL_BOX } from '../actionTypes/VoiceMailTypes';

export const getVoiceMailBoxes = (forceFetch) => (dispatch, getState) => {
  const { VoiceMailBoxReducer: { vmBoxes } } = getState();
  if (size(vmBoxes) === 0 || forceFetch) {
    dispatch(getAction(LOADING_FETCH_VMBOXES));
    return axios
      .get('/api/accounts/vmboxes')
      .then((response) => {
        dispatch(getAction(STOP_LOADING_FETCH_VMBOXES));
        const { data } = response;
        if (data.status === 'success') {
          const vmBoxesData = keyBy(data.data, 'id');
          dispatch(getAction(SUCCESS_FETCH_VMBOXES, vmBoxesData));
          return Promise.resolve(data.data);
        }
        return Promise.reject(new Error('Error: retrieving voicemail boxes'));
      })
      .catch((err) => {
        dispatch(getAction(STOP_LOADING_FETCH_VMBOXES));
        return Promise.reject(err);
      });
  }
  return Promise.resolve();
};

export const redirectToMessages = (history, data) => (dispatch) => {
  if (data) {
    const route = `/vmboxes/${data.id}/messages`;
    dispatch(getAction(SET_CURRENT_VOICEMAIL_BOX, data));
    goTo(history, route);
  }
};

export const setCurrentVoiceMailBox = (vmBoxId) => (dispatch, getState) => {
  if (vmBoxId) {
    const { VoiceMailBoxReducer: { vmBoxes } } = getState();
    const currentVoiceMailBox = find(vmBoxes, (vmBox) => vmBox.id === vmBoxId);
    if (currentVoiceMailBox) {
      dispatch(getAction(SET_CURRENT_VOICEMAIL_BOX, currentVoiceMailBox));
    }
  }
};
