import React,{} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '../../../../inputs/input';
import CheckBox from '../../../../inputs/checkbox';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { domain } from "../../../../App";
import { Wrapper } from "../../../../helpers/styles";
import { Formik, Form} from "formik";
import validationSchema from "../../../../components/application/addDelivery/ValidationSchema";
import DeliveryModel from "../../../../components/application/addDelivery/DeliveryModel";
import formInitialValues from "../../../../components/application/addDelivery/DeliveryInitial";
import '../../../../App.css'
import Button from '../../../../components/application/button/button';
import {useSelector} from "react-redux";
import axios from 'axios';
const { formId, formField:{CustomerName,CustomerAddress,pincode,phone,itemWeight,paymentStatus} } = DeliveryModel;


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:20,
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection:'column-reverse',
      marginBottom:20
    }

  },
  paper: {
    height: 140,
    minWidth: 300,
  },
  avatar:{
    width:"7em",
    height:"7em"
  }
}));



export default function DeliveryAdd(props) {
  const classes = useStyles();
const intialvalue = props.values || formInitialValues;
console.log(props.ref)
const [pic,setFile] = React.useState(intialvalue.PicURL)




const handleChange = function loadFile(event) {
  if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
  }
};


  function _handleSubmit(values) {
    const article = {
      CustomerAddress: values.CustomerAddress,
      itemWeight: values.itemWeight,
      phone: values.phone,
      CustomerName: values.CustomerName,
      paymentStatus: values.paymentStatus,
      pincode:values.pincode,
      BybID:values.bybId,
      latitude:values.latitude,
      longitude:values.longitude
    };
    let newDomain 
    if(props.values){
      newDomain = `${domain}/agents/modifyAgent`
    }
    else{
      newDomain = `${domain}/agents/addAgent`
    }
    axios.post(newDomain,article)
    .then(response=>{
        console.log(response);
        props.closeModal && props.closeModal({makeRequest:true});
        props.setEditing &&  props.setEditing(false);    });
  }


  return (
    <Wrapper className="wrapper" style={{padding:'30px 30px',justifyContent:'flex-start'}}
ref={props.ref}
     >
    <div className={["flex","align-start"]}>
    <Formik
            initialValues={intialvalue}
            validationSchema={validationSchema}
            onSubmit={_handleSubmit}
          >
         {(props) => (
            <Form id={formId} style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <Grid container className={classes.root} spacing={2} style={{justifyContent:'space-between',marginBottom:30}}>
  <div>
  <input type="file" onChange={handleChange} id="upload" accept="image/*" style={{display: "none"}}/>
            <label htmlFor="upload">
                <IconButton color="primary" aria-label="upload picture" component="span" disableRipple={true} size={'medium'} >
                    <Avatar id="avatar" src={pic}
style={{height:100,width:100}}
                    />
                </IconButton>
            </label>
            <label htmlFor="avatar"/>

</div>
<Button width={"100px"} type="submit" disabled = {props.isSubmitting}
   disableFocusRipple = {true}
   disableElevation = {true}>Save</Button>
</Grid>

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
<Input name={CustomerName.name} label={CustomerName.label}  style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={phone.name} label={phone.label}  type="tel" style={{minWidth:300}}/>
            </Grid>

            {/* <Grid item style={{marginLeft:20}}>
            <ReactSelect
            name={paymentStatus.name}
            label={paymentStatus.label}
            data={paymentStatusData}
            style={{minWidth:300}}
          />  </Grid> */}

        </Grid>

        <Grid container justify="left" spacing={4}>
            <Input name={CustomerAddress.name} label={CustomerAddress.label}  style={{minWidth:300}}/>
    </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <Input name={itemWeight.name} label={itemWeight.label}  style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <CheckBox name={paymentStatus.name} label={paymentStatus.label}  style={{minWidth:300}}/>
  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <CheckBox name={paymentStatus.name} label={paymentStatus.label}  style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={pincode.name} label={pincode.label} type="number"  style={{minWidth:300}}/>
  </Grid>
        </Grid>

      </Grid>
    </Grid>



    </Form>
       
       )}

    </Formik>
    </div>
    </Wrapper>
  );
}
