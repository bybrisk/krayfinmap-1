import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';



export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
export  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

export function search(rows,query,comparator){
let filteredrow=rows;
  if(query){
    filteredrow  = rows.filter(item=>{
  return(
    item._source.CustomerName.toLowerCase().includes(query) || item._source.CustomerAddress.toLowerCase().includes(query) || String(item._source.itemWeight).toLowerCase().includes(query) || String(item._source.paymentStatus).toLowerCase().includes(query) || item._source.phone.toLowerCase().includes(query) || item._source.deliveryStatus.toLowerCase().includes(query)
  )
})
}
return stableSort(filteredrow,comparator)
}

export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#d9dcde',
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 16,
    },
  }))(TableCell);
  
export const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  