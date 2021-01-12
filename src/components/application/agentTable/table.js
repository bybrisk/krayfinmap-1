//basic dependencies
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import red from '@material-ui/core/colors/indigo';
import Grow from '@material-ui/core/Grow';
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
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { fetchAgents } from '../../../helpers/networkRequest';
import AgentDetail from '../../../views/app/application/agent/agentDetails';
import { getComparator, stableSort, StyledTableCell, StyledTableRow } from '../tableHelpers/helpers';
import EnhancedTableHead from './tableHead';
//divided component to make them one
import EnhancedTableToolbar from './toolbar';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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

export default function AgentTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('AgentID');
  const [page, setPage] = React.useState(0);
  const [agentid, setagentid] = React.useState('');
  
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [rows,setAgents] = React.useState([])
  const bybId = useSelector(state => state.bybId);
  const headCells = [
    { id: 'PicURL', numeric: true, disablePadding: false, label: 'Photo' },
    { id: 'AgentID', numeric: true, disablePadding: false, label: 'Agent Id' },
    { id: 'AgentName', numeric: false, disablePadding: false, label: 'Agent Name' },
    { id: 'agentType', numeric: false, disablePadding: false, label: 'Type' },
    { id: 'PhoneNumber', numeric: true, disablePadding: false, label: 'Phone Number' },
    { id: 'action', numeric: true, disablePadding: false, label: 'Action' },

  ];

  console.log(bybId)
  const handleOpen = (id) => {
    setagentid(id);
    setOpen(true);
  };
    function handleAgent(){
      fetchAgents({bybId,setAgents});
  }


  const handleClose = () => {
   
    setOpen(false);
handleAgent();
  };

  useEffect(() => {
  fetchAgents({bybId,setAgents});
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
        <EnhancedTableToolbar  handleAgent={handleAgent}/>
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
              <StyledTableCell>
              <Avatar alt={row.AgentName} src={row.PicURL || row.AgentName[0]} />
              </StyledTableCell>
              <StyledTableCell align="center">{row.AgentID}</StyledTableCell>
              <StyledTableCell align="center">{row.AgentName}</StyledTableCell>
              <StyledTableCell align="center">{row.agentType}</StyledTableCell>
              <StyledTableCell align="center">{row.PhoneNumber}</StyledTableCell>
              <StyledTableCell align="center" style={{cursor:'pointer',color:'blue'}} onClick={()=>handleOpen(row.bybid)}>View</StyledTableCell>
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
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Agent-detail"
        aria-describedby="Agent-detail"
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
          background:'#ffffff',
        }}
      >
                      <Grow in={open} timeout={250} >

      <section style={{background:'#ffffff',width:'100%',height:'100%',overflow:'scroll'}}> 
      <p onClick={handleClose} style={{fontSize:40,textAlign:'right',cursor:'pointer',padding:'0 30px',margin:0}}>x</p>

        <AgentDetail id={agentid} handleClose={handleClose}/>
      </section>
      </Grow>
      </Modal>
 
  </>
  );
}
