import React from 'react';
import { get, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import DataTable from '../global/DataTable';
import Select from '../global/Select';
import { parseIdentifier, humanizeDuration } from '../../helpers/parser';

const statusDropdownOptions = [
  {
    label: 'New',
    value: 'new',
  },
  {
    label: 'Saved',
    value: 'saved',
  },
  {
    label: 'Deleted',
    value: 'deleted',
  },
];

const getDropDownStatus = (cell, row, handleChange, status) => {
  const { folder } = row;
  let isLoading = false;
  if (status && !isEmpty(status)) {
    isLoading = status.loading;
  }
  return (
    <Select
      currentValue={folder}
      handleChange={(event) => handleChange(row, event.target.value)}
      options={statusDropdownOptions}
      loading={isLoading}
      style={{ width: '125px' }}
    />
  );
};

const getColumns = (actions, status) => {
  const columns = [
    {
      text: 'Status',
      dataKey: 'folder',
      formatter: (cell, row) => getDropDownStatus(cell,
        row,
        actions.handleStatusChange,
        status[get(row, 'media_id')]),
    },
    {
      text: 'From',
      dataKey: 'from',
      formatter: (cell, row) => {
        const { from } = row;
        return parseIdentifier(from);
      },
    },
    {
      text: 'To',
      dataKey: 'to',
      formatter: (cell, row) => {
        const { to } = row;
        return parseIdentifier(to);
      },
    },
    {
      text: 'Duration',
      dataKey: 'length',
      formatter: (cell, row) => {
        const { length } = row;
        return humanizeDuration(length);
      },
    },
  ];
  return columns;
};

const VoiceMailTable = ({
  data,
  loading,
  handleStatusChange,
  statusChange,
}) => {
  const columns = getColumns({ handleStatusChange }, statusChange);
  return (
    <DataTable
      columns={columns}
      data={data}
      keyId="media_id"
      loading={loading}
    />
  );
};

VoiceMailTable.propTypes = {
  data: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  handleStatusChange: PropTypes.func.isRequired,
  statusChange: PropTypes.instanceOf(Object).isRequired,
};

VoiceMailTable.defaultProps = {
  data: [],
  loading: false,
};

export default VoiceMailTable;
