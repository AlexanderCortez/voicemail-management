import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Box } from '@material-ui/core';
import Navbar from '../global/Navbar';
import VoiceMailTable from './VoiceMailTable';
import SnackBar from '../global/SnackBar';

const styles = {
  box: {
    margin: '20px',
  },
};

class VoiceMailMessagesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: {
        type: 'success',
        text: '',
        open: false,
      },
    };
  }

  componentDidMount() {
    const { fetchMessages } = this.props;
    fetchMessages()
      .then(() => {
        this.handleSnackbarContent('success', 'Messages retrieved');
      })
      .catch(() => {
        this.handleSnackbarContent('error', 'Error retrieving messages');
      });
  }

  handleSnackbarContent = (type, message) => {
    this.setState({
      snackbar: {
        type,
        text: message,
        open: true,
      },
    });
  }

  handleStatusChange = (data, status) => {
    const { changeMessageStatus } = this.props;
    const messageId = get(data, 'media_id');
    changeMessageStatus(messageId, status)
      .then(() => {
        this.handleSnackbarContent('success', 'Message status successfully');
      })
      .catch(() => {
        this.handleSnackbarContent('error', 'Error changing status');
      });
  }

  handleSnackbarClose = () => {
    this.setState(({ snackbar }) => ({
      snackbar: {
        ...snackbar,
        open: false,
      },
    }));
  }

  render() {
    const { snackbar } = this.state;
    const { messages, loadingFetch, statusChange } = this.props;
    return (
      <div>
        <Navbar
          title="VoiceMail Messages"
        />
        <Box
          component="div"
          style={styles.box}
        >
          <VoiceMailTable
            data={messages}
            loading={loadingFetch}
            handleStatusChange={this.handleStatusChange}
            statusChange={statusChange}
          />
        </Box>
        <SnackBar
          open={snackbar.open}
          content={snackbar.text}
          variant={snackbar.type}
          handleClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

VoiceMailMessagesComponent.propTypes = {
  fetchMessages: PropTypes.func.isRequired,
  changeMessageStatus: PropTypes.func.isRequired,
  messages: PropTypes.instanceOf(Array).isRequired,
  loadingFetch: PropTypes.bool.isRequired,
  statusChange: PropTypes.instanceOf(Object).isRequired,
};

export default VoiceMailMessagesComponent;
