import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import DataTable from '../global/DataTable';

const getColumns = (actions) => {
  const columns = [
    {
      text: 'Actions',
      dataKey: '',
      style: {
        width: '100px',
      },
      formatter: (cell, row) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => actions.handleManageAction(row)}
        >
          Manage
        </Button>
      ),
    },
    {
      text: 'Name',
      dataKey: 'name',
    },
    {
      text: 'Messages',
      dataKey: 'messages',
    },
  ];
  return columns;
};

const VoiceMailBoxesTable = ({
  data,
  loading,
  handleManageAction,
}) => {
  const columns = getColumns({ handleManageAction });
  return (
    <DataTable
      loading={loading}
      keyId="id"
      data={data}
      columns={columns}
    />
  );
};

VoiceMailBoxesTable.propTypes = {
  data: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  handleManageAction: PropTypes.func.isRequired,
};

VoiceMailBoxesTable.defaultProps = {
  data: [],
  loading: false,
};

export default VoiceMailBoxesTable;
