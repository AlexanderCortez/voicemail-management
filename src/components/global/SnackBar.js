import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const Alert = ({ children, variant, onClose }) => (
  <MuiAlert
    elevation={6}
    variant="filled"
    severity={variant}
    onClose={onClose}
  >
    {children}
  </MuiAlert>
);

const SnackBar = ({
  handleClose,
  open,
  variant,
  content,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  >
    <Alert
      onClose={handleClose}
      variant={variant}
    >
      {content}
    </Alert>
  </Snackbar>
);

SnackBar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  content: PropTypes.node,
};

SnackBar.defaultProps = {
  open: false,
  handleClose: () => {},
  variant: 'success',
  content: <div />,
};

Alert.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  children: <div />,
  variant: 'success',
  onClose: () => {},
};

export default SnackBar;
