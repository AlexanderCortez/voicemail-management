import axios from 'axios';

export const fetchMessages = () => () => {
  const { REACT_APP_ACCOUNT_ID, REACT_APP_VMBOX_ID } = process.env;
  return axios
    .get(`/accounts/${REACT_APP_ACCOUNT_ID}/vmboxes/${REACT_APP_VMBOX_ID}/messages`);
};
