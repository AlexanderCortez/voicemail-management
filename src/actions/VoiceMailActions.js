import axios from 'axios';
import { keyBy } from 'lodash';
import { FETCH_MESSAGES } from '../actionTypes/VoiceMailTypes';

export const fetchMessages = () => (dispatch) => axios
  .get('/api/accounts/messages')
  .then((response) => {
    const messages = keyBy(response.data.data, 'call_id');
    dispatch({
      type: FETCH_MESSAGES,
      payload: messages,
    });
    return messages;
  });
