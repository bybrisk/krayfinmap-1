import red from '@material-ui/core/colors/indigo';
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
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, Suspense} from 'react';
import Loader from '../../Loader/Loader'
import { Helmet } from "react-helmet";
// import AgentDetail from '../AgentDetails'
import { getComparator, stableSort, StyledTableCell, StyledTableRow } from '../../tableHelpers/helpers';
import TableHead from '../tableHead';
import Toolbar from './toolbar'
//divided component to make them one


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

  export default function DeliveryContainer(props) {
    const {rows} = props;
    const classes = useStyles();
  //page elements starts
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('AgentID');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const lastChild = useRef(null);
    const headCells = [
      { id: 'CustomerName', numeric: false, disablePadding: false, label: 'Name' },
      { id: 'Locality', numeric: false, disablePadding: false, label: 'Locality' },
      { id: 'Landmark', numeric: false, disablePadding: false, label: 'Landmark' },
      { id: 'City', numeric: false, disablePadding: false, label: 'City' },
      { id: 'Pin', numeric: false, disablePadding: false, label: 'Pin' },
      { id: 'phone', numeric: true, disablePadding: false, label: 'Mobile' },
      { id: 'itemWeight', numeric: true, disablePadding: false, label: 'Item Weight' },
      { id: 'Amount', numeric: true, disablePadding: false, label: 'Payment' },
  
    ];
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
    //page elements end
  
   //query is internal part of application
   console.log(rows,"llllflflflflflflflflflflfls")

   
    return (
      <>
       <Helmet>
          <title>Failed Deliveries</title>
          <meta name="description" content="List of Deliveries failed while uploading "  />
        </Helmet>
   <Suspense fallback={<Loader />}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
        <Toolbar rows={rows}/>
        <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="Agents"
              aria-label="Agent Data"
            >
              <TableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />
              <TableBody>
              {rows && (
                
rows?.map((row) => {
                    return (
                      <>
                      <StyledTableRow
                        tabIndex={-1}
                        key={row["Customer Name"]}
                        ref={lastChild}
                        style={{cursor:'pointer'}}
                        >
                <StyledTableCell align="center"  >{row["Customer Name"]}</StyledTableCell>
                <StyledTableCell align="center" >{row["Locality"]}</StyledTableCell>
                <StyledTableCell align="center" >{row["Landmark"]}</StyledTableCell>
                <StyledTableCell align="center" >{row["City"]}</StyledTableCell>              
                <StyledTableCell align="center" >{row["Pincode"]}</StyledTableCell>
                <StyledTableCell align="center" >{row["Phone"]}</StyledTableCell>
                <StyledTableCell align="center" >{row["Item Weight"]}</StyledTableCell>
                <StyledTableCell align="center" >{row["Amount"]}</StyledTableCell>
 
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
  </Suspense>
    </>
    );
}