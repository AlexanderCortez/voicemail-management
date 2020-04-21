import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VoiceMailMessagesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchMessages } = this.props;
    fetchMessages();
  }

  render() {
    return (
      <div>
        This is another example
      </div>
    );
  }
}

VoiceMailMessagesComponent.propTypes = {
  fetchMessages: PropTypes.func.isRequired,
};

export default VoiceMailMessagesComponent;
