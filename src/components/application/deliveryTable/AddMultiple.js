import React,{useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid';
import { Wrapper } from "../../../helpers/Styles";
import { useSnackbar } from 'notistack';

import Button from '../button/button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import XLSX from 'xlsx';
import {useSelector} from "react-redux";
import {AddDelivery} from '../../../helpers/NetworkRequest'
import '../../../App.css'




const AddMultiple = (props) =>{
  const { enqueueSnackbar } = useSnackbar();
const [loader,setLoader] = useState(false)
  const bybId = useSelector(state => state.bybId)
  const {closeModal} = props;

  const FinalStep = async (data) =>{
    setLoader(true);
for(let i=0;i<data.length;i++){
  const article = JSON.stringify({
    CustomerAddress: data[i]["Customer Address"],
    itemWeight: data[i]["Item Weight"],
    phone: data[i]["Phone"].toString(),
    CustomerName:data[i]["Customer Name"],
    pincode:data[i]["Pincode"].toString(),
    BybID:bybId
  });
await AddDelivery({article})


}
setLoader(false);
enqueueSnackbar('Delivery Added Succesfully',{
  variant: 'success',
  autoHideDuration: 2000,
});

closeModal({makeRequest:true});
  }


    const readExcel = (file) =>{
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
      console.log(data,"------------------array")
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
    height:'3.3rem',
    textAlign:'center',
    cursor:'pointer'
}}>
          {!loader?"Upload Excel File":(<CircularProgress size = {16}/>)}
</div>
            </label>

</div>
    </Wrapper>


        </>
    )
}

export default AddMultiple;