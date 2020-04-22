import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Box, Button } from '@material-ui/core';
import styled from 'styled-components';
import { ArrowBackIos } from '@material-ui/icons';
import Navbar from '../global/Navbar';
import VoiceMailTable from './VoiceMailTable';
import SnackBar from '../global/SnackBar';
import { goTo } from '../../actions/AppActions';

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
    const {
      fetchMessages,
      getVoiceMailBoxes,
      setCurrentVoiceMailBox,
      match,
    } = this.props;
    getVoiceMailBoxes()
      .then(() => {
        const vmBoxId = get(match.params, 'vmBoxId', '');
        setCurrentVoiceMailBox(vmBoxId);
        return fetchMessages();
      })
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

  goToRoot = () => {
    const { history } = this.props;
    goTo(history, '/');
  }

  getHeaderTitle = () => {
    const { currentVoiceMailBox } = this.props;
    if (currentVoiceMailBox && currentVoiceMailBox.name) {
      return `${currentVoiceMailBox.name} - Messages`;
    }
    return '';
  }

  render() {
    const { snackbar } = this.state;
    const {
      messages, loadingFetch, statusChange,
    } = this.props;
    const title = this.getHeaderTitle();
    return (
      <div>
        <Navbar
          title={title}
        />
        <Box
          component="div"
          style={styles.box}
        >
          <BackWardWrapper>
            {
              !loadingFetch
                && (
                  <Button
                    onClick={this.goToRoot}
                  >
                    <ArrowBackIos />
                    <span>Go to VoiceMail Boxes List</span>
                  </Button>
                )
            }
          </BackWardWrapper>
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
  setCurrentVoiceMailBox: PropTypes.func.isRequired,
  getVoiceMailBoxes: PropTypes.func.isRequired,
  messages: PropTypes.instanceOf(Array).isRequired,
  loadingFetch: PropTypes.bool.isRequired,
  statusChange: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  currentVoiceMailBox: PropTypes.instanceOf(Object).isRequired,
};

const BackWardWrapper = styled.div`
  height: 50px;
  margin: 15px 0;
  display: flex;
  align-items: center;
  * {
    text-transform: none !important;
  }
`;

export default VoiceMailMessagesComponent;
