import React,{useState} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Wrapper } from "helpers/Styles";
import { useSnackbar } from 'notistack';
import FailedDeliveries from './failedDeliveries/failedDeliveryTable'
import Button from '../button/button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import XLSX from 'xlsx';
import {useSelector} from "react-redux";
import {AddDelivery,AddDeliveryWithGeoCode} from 'helpers/NetworkRequest'
import 'App.css'
import ExcelDemo from 'Assets/excelDemo.png'
import { object } from 'yup';
const API = axios.create({
  baseURL:"https://bybriskbackend.herokuapp.com",
  withCredentials:true,
  credentials:"include"
})
const config = {headers:{"Content-Type": "application/json"}}

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
const [loader,setLoader] = useState(false);
let cancel = {status:false}
const bybId = useSelector(state => state.bybId)
const [failedDeliveries,setFailedDeliveries] = useState([])
const [showFailed,setShowFailed] = useState(false);
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const [data,setData] = useState([])

  const ApiRequestsWithoutLatitude = async (data) =>{
    function setfailed(item, index, arr) {
      if(item.value.data.message==="GEOCODING FAILED"){
        const newArray = failedDeliveries;
        newArray.push(data[index]);
        setFailedDeliveries(newArray);
      }

  }
  
    const deliveryPromises = data.map((item,index)=>{
     const deliveryJson =  JSON.stringify({
        CustomerAddress: item['Locality']+", "+item["Landmark"]+ ", " +item["City"],
        itemWeight: item["Item Weight"],
        phone: item["Phone"].toString(),
        CustomerName:item["Customer Name"],
        paymentStatus:item["Amount"]?false:true,
        amount:item["Amount"] || 0,
        note:item["Note"].toString(),
        BybID:bybId
      })
      const response =  AddDelivery({article:deliveryJson,failedDeliveries})
      // setProgress((index/data.length)*100);
return response;
    })
//adding new for loop 
let count = 0;
for(const proms of deliveryPromises){
 await proms.then(result=>{
    count+=1;
    setProgress(count*100/deliveryPromises.length);
  if(result.data.message==="GEOCODING FAILED"){
  const newArray = failedDeliveries;
  newArray.push(data[progress]);
  setFailedDeliveries(newArray);
console.log(failedDeliveries,"-nikhiltale");
}
  })
  .catch(error=>{
// console.log(error);
  })
}
if(failedDeliveries.length!==0) {setShowFailed(true)}
else{
  props.closeModal();
}
  // await Promise.allSettled(deliveryPromises).then(values=>{
  //   console.log(values);

  // values.forEach(setfailed);
  // if(failedDeliveries.length!==0) {setShowFailed(true)}
  // else{
  //   setProgress(100);
  //   props.closeModal();
  // }
  
  //   // return values;
  // }).catch(error=>props.closeModal());




    }

    // RequestMaker(0)
    // Promise.allSettled(responseArray).
    // then(results=>results.forEach((result,index)=>{
    //   if(result.data.message==="GEOCODING FAILED"){
    //     // console.log(failedDeliveries,"before pushing",data[index])
    //     failedDeliveries.push(data[index])
    //     // console.log(failedDeliveries,"'settong faoledk clelc")
    //     // setFailedDeliveries(newDeliveries)
    //   }
    // }))
    





const ApiRequestsWithLatitude = async (data) =>{
  let responseArray = [];
  console.log(data,"entered into apirequestwithout latitude")
  data.map((item,index)=>{
    
      const json = JSON.stringify({
     CustomerAddress: item['Locality']+", "+item["Landmark"]+ ", " +item["City"],
    itemWeight: item["Item Weight"],
    phone: item["Phone"].toString(),
    latitude:item['Latitude'],
    longitude:item["Longitude"],
    CustomerName:item["Customer Name"],
    paymentStatus:item["Amount"]?false:true,
    amount:item["Amount"] || 0,
    note:item["Note"].toString(),
    BybID:bybId
  })
  AddDeliveryWithGeoCode({article:json,source,responseArray})
  })
let count = 0;
for(const proms of responseArray){
  count+=1;
     setProgress(count*100/responseArray.length);
  await proms.then(result=>{

   })
   .catch(error=>{
//  console.log(error);
   })
 }
 props.closeModal();
  // Promise.all(responseArray).then(result=>
  //   {props.closeModal();
  //     result.forEach((item)=>console.log(item,"from item"))});
if(axios.isCancel()){
  setLoader(false);
}
}



  
//  console.log(deliveryJson)



  
const handleCancel = () =>{
  console.log(cancel.status,"from handlecancel")

cancel.status = true  

}


    const readExcel = (file) =>{
      setLoader(true);
//       console.log(loader,"----------independent")
// console.log("reading excel file",loader)
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
    // console.log("read excel file",loader)
setData(data);
    promise.then(data=>{
      data[0].Latitude ? ApiRequestsWithLatitude(data):ApiRequestsWithoutLatitude(data)    })
      }
      console.log(failedDeliveries,"from global ")
    return(
        <>
        {showFailed?(
          <>
           <FailedDeliveries rows={failedDeliveries}/> 
          </>
        ):(<Wrapper className="wrapper" style={{padding:'30px 30px',justifyContent:'flex-start'}}>
   <img src={ExcelDemo} style={{width:'50%'}} alt={'excel file demo'} />
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
          {!loader?"Upload Excel File":(<CircularProgressWithLabel value={progress} />)}
</div>
            </label>
<div style={{marginTop:50}} onClick={()=>source.cancel("axios request cancelled")}>Cancel</div>
</div>
    </Wrapper>
)}


        </>
    )
}

export default AddMultiple;



