//basic dependencies
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
//dependecies for table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//dependencies for modal
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
//divided component to make them one
import EnhancedTableToolbar from './EnhancedToolbar';
import EnhancedTableHead from './TableHead';
import { getComparator, stableSort, StyledTableCell, StyledTableRow } from './TableHelpers';
import { rows } from './TableRow';
import AgentDetail from '../AgentDetails'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function BybriskTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('agentid');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //this function set the state for sorting information
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  
  //function for page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //function for row change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


//telling how many rows can come into this page
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar  />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="Agents"
            aria-label="Agent Data"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    <StyledTableRow
                      tabIndex={-1}
                      key={row.name}
                    >
              <StyledTableCell>
                {row.photo}
              </StyledTableCell>
              <StyledTableCell align="center">{row.agentid}</StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.type}</StyledTableCell>
              <StyledTableCell align="center">{row.mobile}</StyledTableCell>
              <StyledTableCell align="center" style={{cursor:'pointer',color:'blue'}} onClick={handleOpen}>View</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      
    </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Add-Agent"
        aria-describedby="Add-Agent"
        closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 400,
                }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:'column',
          background:'#ffffff'
        }}
      >
                      <Grow in={open} timeout={250}>

      <section style={{background:'#ffffff',width:'100%',height:'100%'}}> 
      <p onClick={handleClose} style={{fontSize:40,textAlign:'right',cursor:'pointer',padding:'0 30px',margin:0}}>x</p>

        <AgentDetail />
      </section>
      </Grow>
      </Modal>
     
  </>
  );
}
