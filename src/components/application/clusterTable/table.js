//basic dependencies
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import red from '@material-ui/core/colors/indigo';
import Grow from '@material-ui/core/Grow';
import { Helmet } from "react-helmet";
import { useSnackbar } from 'notistack';

//dependencies for modal
import Modal from "@material-ui/core/Modal";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
//dependecies for table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { Component, useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { genetateOverview } from 'helpers/NetworkRequest';
import { getComparator, stableSort, StyledTableCell, StyledTableRow } from '../tableHelpers/helpers';
import EnhancedTableHead from './tableHead';
//divided component to make them one
import EnhancedTableToolbar from './toolbar';
import CircularLoader from '../Loader/circularLoader';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding:theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    paddingTop:20
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
  avatar: {
    color: '#ffffff',
    backgroundColor:red[700],
  },
}));

function ClusterTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('clusterTime');
  const [page, setPage] = React.useState(0);
  const [agentid, setagentid] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading,setLoading] = useState(false);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [rows,setClusters] = React.useState([])
  
  const bybId = useSelector(state => state.bybId);
  const headCells = [
    { id: 'Agent_Name', numeric: true, disablePadding: false, label: 'Agent Name' },
    { id: 'deliveryAgentID', numeric: true, disablePadding: false, label: 'Agent ID' },
    { id: 'totalDeliveries', numeric: false, disablePadding: false, label: 'Deliveries in Cluster' },
    { id: 'clusterDistance', numeric: false, disablePadding: false, label: 'Cluster Distance' },
    { id: 'clusterTime', numeric: false, disablePadding: false, label: 'Cluster Time' },
    { id: 'distanceObserved', numeric: true, disablePadding: false, label: 'Distance Observed' },
    { id: 'averageWeight', numeric: true, disablePadding: false, label: 'Total Weight' },

  ];



  useEffect( () => {
    genetateOverview({bybId, setClusters,setLoading})

    return () => {
      
    }
  }, [bybId])

  

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

  const calculatedLength = () =>{
    let calculatedlength=0;
      for(let i=0;i<rows.length;i++){
        console.log(rows[i]?.totalDeliveries,calculatedlength,"====---===---===---==")
calculatedlength+=rows[i]?.totalDeliveries
    }
    return calculatedlength;
  }

  //function for row change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


//telling how many rows can come into this page
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <>
   <Helmet>
        <title>Agents</title>
        <meta name="description" content="List of Agents Delivering your deliveries"  />
      </Helmet>
 {isLoading ? (
   <CircularLoader/>
 ):(<div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar totaldeliveries={calculatedLength()} setClusters={setClusters} />
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
              headCells={headCells}
            />
            <TableBody>
              {rows && (
                stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <>
                    <StyledTableRow
                      tabIndex={-1}
                      key={row.name}
                    >
               <StyledTableCell align="center">{row.deliveryAgentName}</StyledTableCell>
              <StyledTableCell align="center">{row.deliveryAgentID}</StyledTableCell>
              <StyledTableCell align="center">{row.totalDeliveries}</StyledTableCell>
              <StyledTableCell align="center">{row.clusterDistance}</StyledTableCell>
              <StyledTableCell align="center">{row.clusterTime}</StyledTableCell>

               <StyledTableCell align="center">{(row.distanceObserved/1000).toFixed(2)} KM</StyledTableCell>
               <StyledTableCell align="center">{row.averageWeight}</StyledTableCell>

              {/*<StyledTableCell align="center" style={{cursor:'pointer',color:'blue'}} onClick={()=>handleOpen(row.bybid)}>View</StyledTableCell> */}
                    </StyledTableRow>
                    </>
                  );
                })
              )
                }
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
   )}
    
  </>
  );
}

export default React.memo(ClusterTable)