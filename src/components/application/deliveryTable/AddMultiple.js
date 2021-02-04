import React,{useState} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';
import { Wrapper } from "helpers/Styles";
import { useSnackbar } from 'notistack';

import Button from '../button/button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import XLSX from 'xlsx';
import {useSelector} from "react-redux";
import {AddDelivery} from 'helpers/NetworkRequest'
import 'App.css'

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" style={{color:'#ffffff'}}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};




const AddMultiple = (props) =>{
  const [progress, setProgress] = React.useState(0);
  const { enqueueSnackbar } = useSnackbar();
const [loader,setLoader] = useState(false)
  const bybId = useSelector(state => state.bybId)
  const {closeModal} = props;

  const FinalStep = async (data) =>{
for(let i=0;i<data.length;i++){
  const article = JSON.stringify({
    CustomerAddress: data[i]["Locality"]+" "+data[i]["Landmark"]+" "+data[i]["City"],
    itemWeight: data[i]["Item Weight"],
    phone: data[i]["Phone"].toString(),
    CustomerName:data[i]["Customer Name"],
    paymentStatus:data[i]["Amount"]?false:true,
    amount:data[i]["Amount"] || 0,
    pincode:data[i]["Pincode"].toString(),
    BybID:bybId
  });
await AddDelivery({article})

setProgress((i/data.length)*100);
}
setLoader(false);
enqueueSnackbar('Delivery Added Succesfully',{
  variant: 'success',
  autoHideDuration: 2000,
});

closeModal({makeRequest:true});
  }


    const readExcel = (file) =>{
      setLoader(true);

        const promise = new Promise((resolve,reject)=>
        {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) =>{
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray,{type:'buffer'})
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname]
    const data = XLSX.utils.sheet_to_json(ws);
    resolve(data);
    }
        
    fileReader.onerror = ((error)=>{
    reject(error)
    })
    })
    
    promise.then(data=>{
      FinalStep(data);
    })
      }
      
    return(
        <>
    <Wrapper className="wrapper" style={{padding:'30px 30px',justifyContent:'flex-start'}}>
    <div>
  <input type="file" onChange={(e)=>{
        const file = e.target.files[0];

        readExcel(file)
      }} id="excelUpload" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style={{display: "none"}}/>
         
            <label htmlFor="excelUpload">
            <div style={{    background: '#FF6F1F',
    borderRadius:'10rem',
    border:'10px',
    color:'#ffffff',
    margin:'0',
    padding:'1rem',
    width:'300px',
    height:'3.5rem',
    textAlign:'center',
    cursor:'pointer'
}}>
          {!loader?"Upload Excel File":(<CircularProgressWithLabel value={progress}/>)}
</div>
            </label>

</div>
    </Wrapper>


        </>
    )
}

export default AddMultiple;