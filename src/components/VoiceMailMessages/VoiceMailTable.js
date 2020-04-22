import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '../global/DataTable';
import { parseIdentifier, humanizeDuration } from '../../helpers/parser';

const columns = [
  {
    text: 'Status',
    dataKey: 'folder',
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

const VoiceMailTable = ({
  data,
  loading,
}) => (
  <DataTable
    columns={columns}
    data={data}
    keyId="call_id"
    loading={loading}
  />
);

VoiceMailTable.propTypes = {
  data: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
};

VoiceMailTable.defaultProps = {
  data: [],
  loading: false,
};

export default VoiceMailTable;
