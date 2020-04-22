import axios from 'axios';
import { keyBy } from 'lodash';
import {
  FETCH_MESSAGES,
  LOADING_FETCH_MESSAGES,
  STOP_LOADING_FETCH_MESSAGES,
  LOADING_CHANGE_MESSAGE_STATUS,
  STOP_CHANGE_MESSAGE_STATUS,
  SUCCESS_CHANGE_MESSAGE_STATUS,
} from '../actionTypes/VoiceMailTypes';

const getAction = (type, payload) => ({
  type,
  payload,
});

export const fetchMessages = () => (dispatch) => {
  dispatch(getAction(LOADING_FETCH_MESSAGES));
  return axios
    .get('/api/accounts/messages')
    .then((response) => {
      const messages = keyBy(response.data.data, 'media_id');
      dispatch(getAction(FETCH_MESSAGES, messages));
      dispatch(getAction(STOP_LOADING_FETCH_MESSAGES));
      return messages;
    })
    .catch((err) => {
      dispatch(getAction(STOP_LOADING_FETCH_MESSAGES));
      return Promise.reject(err);
    });
};

export const changeMessageStatus = (messageId, status) => (dispatch) => {
  dispatch(getAction(LOADING_CHANGE_MESSAGE_STATUS, messageId));
  return axios
    .patch(`api/accounts/messages/${messageId}/changeStatus`, { status })
    .then((response) => {
      dispatch(getAction(STOP_CHANGE_MESSAGE_STATUS, messageId));
      const { data } = response;
      if (data.status === 'success') {
        dispatch(getAction(SUCCESS_CHANGE_MESSAGE_STATUS, data.data));
        return Promise.resolve(data.data);
      }
      return Promise.reject(new Error('Error: chaginng status'));
    })
    .catch((err) => {
      dispatch(getAction(STOP_CHANGE_MESSAGE_STATUS, messageId));
      return Promise.reject(err);
    });
};
