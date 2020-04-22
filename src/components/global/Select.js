import React from 'react';
import { Select, InputBase, MenuItem, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';

const Input = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const getLoaderInCurrentValue = (currentValue, optionValue) => {
  if (currentValue === optionValue) {
    return (
      <span>
        <CircularProgress
          size={15}
          style={{ marginRight: '10px' }}
        />
      </span>
    );
  }
  return null;
};

const SelectComponent = ({
  currentValue,
  handleChange,
  options,
  loading,
  style,
}) => {
  return (
    <Select
      style={style}
      value={currentValue}
      onChange={(event) => {
        if (!loading && handleChange) {
          handleChange(event);
        }
      }}
      input={<Input />}
      disabled={loading}
    >
      {
        options.map((option) => (
          <MenuItem
            value={option.value}
            key={uniqueId()}
          >
            {loading && getLoaderInCurrentValue(currentValue, option.value)}
            {option.label}
          </MenuItem>
        ))
      }
    </Select>
  );
};

SelectComponent.propTypes = {
  currentValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  loading: PropTypes.bool,
  style: PropTypes.instanceOf(Object),
};

SelectComponent.defaultProps = {
  currentValue: '',
  loading: false,
  style: {},
};

export default SelectComponent;
