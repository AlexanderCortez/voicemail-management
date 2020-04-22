import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Navbar from '../global/Navbar';
import VoiceMailBoxesTable from './VoiceMailBoxesTable';

const styles = {
  box: {
    margin: '20px',
  },
};

class VoiceMailBoxComponent extends Component {
  componentDidMount() {
    const { getVoiceMailBoxes } = this.props;
    getVoiceMailBoxes();
  }

  handleManageAction = (data) => {
    if (data) {
      const { history, redirectToMessages } = this.props;
      redirectToMessages(history, data);
    }
  }

  render() {
    const { loadingFetch, vmBoxes } = this.props;
    return (
      <div>
        <Navbar
          title="VoiceMail Boxes"
        />
        <Box
          component="div"
          style={styles.box}
        >
          <VoiceMailBoxesTable
            data={vmBoxes}
            loading={loadingFetch}
            handleManageAction={this.handleManageAction}
          />
        </Box>
      </div>
    );
  }
}

VoiceMailBoxComponent.propTypes = {
  getVoiceMailBoxes: PropTypes.func.isRequired,
  redirectToMessages: PropTypes.func.isRequired,
  vmBoxes: PropTypes.instanceOf(Array).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  loadingFetch: PropTypes.bool.isRequired,
};

export default VoiceMailBoxComponent;
