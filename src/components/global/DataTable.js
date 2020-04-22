import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { isFunction, size } from 'lodash';
import styled from 'styled-components';
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
  TableFooter,
  TablePagination,
  CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { MoveToInbox } from '@material-ui/icons';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const getCellContent = (row, column = {}, index) => {
  const { dataKey, formatter } = column;
  if (formatter && isFunction(formatter)) {
    return formatter(dataKey, row, index);
  }
  return row[dataKey];
};

const getLoaderContent = (loadingText) => (
  <ToolWrapper>
    <div>
      <CircularProgress size={50} />
    </div>
    <div>
      <p>{loadingText}</p>
    </div>
  </ToolWrapper>
);

const getEmptyContent = () => (
  <ToolWrapper>
    <div>
      <MoveToInbox
        style={{ color: 'gray', fontSize: 50 }}
      />
    </div>
    <div>
      <p>No data</p>
    </div>
  </ToolWrapper>
);

const getTableBody = (data, columns, keyId, count) => {
  if (count === 0) {
    return (
      <TableRow>
        <TableCell
          colSpan={size(columns)}
        >
          {getEmptyContent()}
        </TableCell>
      </TableRow>
    );
  }
  return data.map((row) => (
    <TableRow key={row[keyId]}>
      {
        columns.map((column, index) => {
          const key = index;
          return (
            <TableCell
              style={column.style || {}}
              key={key}
            >
              {getCellContent(row, column, index)}
            </TableCell>
          );
        })
      }
    </TableRow>
  ));
};

const DataTable = ({
  columns,
  data,
  keyId,
  loading,
  loadingText,
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPage,
  page,
  count,
}) => {
  const classes = useStyles();
  if (loading) {
    return getLoaderContent(loadingText);
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              columns.map((column, index) => {
                const key = `${column.text}+${index}`;
                return (
                  <TableCell
                    key={key}
                  >
                    {column.text}
                  </TableCell>
                );
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {getTableBody(data, columns, keyId, count)}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleChangePage = (event, page) => {
    this.setState({
      page,
    });
  };

  handleChangeRowsPerPage = (event) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    this.setState({
      rowsPerPage,
      page: 0,
    });
  };

  getData = () => {
    const { rowsPerPage, page } = this.state;
    const { data } = this.props;
    if (rowsPerPage > 0) {
      const rows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
      return rows;
    }
    return data;
  }

  render() {
    const {
      columns, keyId, loading, loadingText, data,
    } = this.props;
    const { page, rowsPerPage } = this.state;
    const rows = this.getData();
    return (
      <DataTable
        columns={columns}
        data={rows}
        count={size(data)}
        keyId={keyId}
        loading={loading}
        loadingText={loadingText}
        handleChangePage={this.handleChangePage}
        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  keyId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

TableComponent.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  keyId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
};

TableComponent.defaultProps = {
  loading: false,
  loadingText: 'Loading ...',
};

const ToolWrapper = styled.div`
  min-height: 100px;
  width: 100%;
  padding: 20px 0;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default TableComponent;
