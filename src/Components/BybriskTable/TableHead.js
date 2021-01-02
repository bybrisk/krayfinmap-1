import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';
import { StyledTableCell } from './TableHelpers';
const headCells = [
    { id: 'AgentID', numeric: true, disablePadding: false, label: 'Agent Id' },
    { id: 'AgentName', numeric: false, disablePadding: false, label: 'Agent Name' },
    { id: 'agentType', numeric: false, disablePadding: false, label: 'Type' },
    { id: 'PhoneNumber', numeric: true, disablePadding: false, label: 'Phone Number' },
  ];
  
  //this is function to desplay table heads
  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    
    //helper function to call onRequestSort(handleRequestSort)
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <StyledTableCell>Photo</StyledTableCell>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align={'center'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
              style={{color:'white'}}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
                  <StyledTableCell>Action</StyledTableCell>
  
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  

  export default EnhancedTableHead