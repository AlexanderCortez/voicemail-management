import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      loadingFetch: false,
      snackbar: {
        type: 'success',
        text: '',
        open: false,
      },
    };
  }

  componentDidMount() {
    const { fetchMessages } = this.props;
    this.setState({ loadingFetch: true });
    fetchMessages()
      .then(() => {
        this.setState({
          loadingFetch: false,
          snackbar: {
            type: 'success',
            text: 'Messages retrieved',
            open: true,
          },
        });
      })
      .catch(() => {
        this.setState({
          loadingFetch: false,
          snackbar: {
            type: 'error',
            text: 'Error retrieving messages',
            open: true,
          },
        });
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
    const { messages } = this.props;
    const { loadingFetch, snackbar } = this.state;
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
  messages: PropTypes.instanceOf(Array).isRequired,
};

export default VoiceMailMessagesComponent;
