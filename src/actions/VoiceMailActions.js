import axios from 'axios';
import { keyBy, size } from 'lodash';
import {
  FETCH_MESSAGES,
  LOADING_FETCH_MESSAGES,
  STOP_LOADING_FETCH_MESSAGES,
  LOADING_CHANGE_MESSAGE_STATUS,
  STOP_CHANGE_MESSAGE_STATUS,
  SUCCESS_CHANGE_MESSAGE_STATUS,
} from '../actionTypes/VoiceMailTypes';
import { getAction } from './AppActions';

export const fetchMessages = (forFetch) => (dispatch, getState) => {
  const { VoiceMailReducer: { currentVoiceMailBox, messages } } = getState();
  const vmBoxId = currentVoiceMailBox.id;
  if (size(messages[vmBoxId]) === 0 || forFetch) {
    dispatch(getAction(LOADING_FETCH_MESSAGES));
    return axios
      .get(`/api/accounts/vmboxes/${vmBoxId}/messages`)
      .then((response) => {
        const messagesData = keyBy(response.data.data, 'media_id');
        dispatch(getAction(FETCH_MESSAGES, {
          messages: messagesData,
          vmBoxId,
        }));
        dispatch(getAction(STOP_LOADING_FETCH_MESSAGES));
        return Promise.resolve(messages);
      })
      .catch((err) => {
        dispatch(getAction(STOP_LOADING_FETCH_MESSAGES));
        return Promise.reject(err);
      });
  }
  return Promise.resolve();
};

export const changeMessageStatus = (messageId, status) => (dispatch, getState) => {
  const { VoiceMailReducer: { currentVoiceMailBox } } = getState();
  const vmBoxId = currentVoiceMailBox.id;
  dispatch(getAction(LOADING_CHANGE_MESSAGE_STATUS, messageId));
  return axios
    .patch(`api/accounts/vmboxes/${vmBoxId}/messages/${messageId}/changeStatus`, { status })
    .then((response) => {
      dispatch(getAction(STOP_CHANGE_MESSAGE_STATUS, messageId));
      const { data } = response;
      if (data.status === 'success') {
        dispatch(getAction(SUCCESS_CHANGE_MESSAGE_STATUS, {
          data: data.data,
          vmBoxId,
        }));
        return Promise.resolve(data.data);
      }
      return Promise.reject(new Error('Error: chaginng status'));
    })
    .catch((err) => {
      dispatch(getAction(STOP_CHANGE_MESSAGE_STATUS, messageId));
      return Promise.reject(err);
    });
};
