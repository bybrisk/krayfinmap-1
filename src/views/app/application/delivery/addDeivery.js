import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress'
import ReactPlaceInput from "helpers/reactPlace"
import { Helmet } from "react-helmet";

import Grid from '@material-ui/core/Grid';
import Input from 'inputs/input';
import CheckBox from 'inputs/checkbox';
import Select from 'inputs/select';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { domain } from "App";
import { Wrapper } from "helpers/Styles";
import {AddDelivery} from 'helpers/NetworkRequest'
import { Formik, Form} from "formik";
import validationSchema from "components/application/addDelivery/ValidationSchema";
import DeliveryModel from "components/application/addDelivery/DeliveryModel";
import formInitialValues from "components/application/addDelivery/DeliveryInitial";
import 'App.css'
import Button from 'components/application/button/button';
import {useSelector} from "react-redux";
import axios from 'axios';
const { formId, formField:{CustomerName,note,phone,itemWeight,paymentStatus,Locality,Landmark,City,PendingAmount} } = DeliveryModel;



const DeliveryStatus = [
  {
    value: undefined,
    label: "None"
  },
  {
    value: "confirmed",
    label: "Confirmed",
    color:'green'
  },
  {
    value: "pending",
    label: "Pending",
    color:'#8C6911'
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color:'red'
  }
];



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
  const { enqueueSnackbar } = useSnackbar();
const {values,closeModal} = props;

const intialvalue = values || formInitialValues;
const bybId = useSelector(state => state.bybId)
const user = useSelector(state => state.user)


  function _handleSubmit(values,actions) {
    const article = JSON.stringify({
      CustomerAddress: values.Locality + " " + values.Landmark + " " + values.City + " " + values.note,
      itemWeight: values.itemWeight,
      phone: values.phone,
      CustomerName: values.CustomerName,
      paymentStatus: values.paymentStatus,
      note:values.note,
      BybID:bybId,
      deliveryStatus:'pending',
      amount: values.PendingAmount || 0
    });
    AddDelivery({article,actions,closeModal,enqueueSnackbar})
  }


  return (
   <>
          <Helmet>
        <title>Add Delivery</title>
        <meta name="description" content="Add New Delivery" />
        <meta name="keywords" cpntent="Adding Delivery, Delivery, bybrisk, krayfinmap" />
      </Helmet>

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
                <IconButton color="primary" aria-label="Agent Picture" component="span" disableRipple={true} size={'medium'} >
                    <Avatar id="avatar" src={user.PicURL}
style={{height:100,width:100}}
                    />
                </IconButton>

</div>
<Button width={"100px"} type="submit" disabled = {props.isSubmitting}
   disableFocusRipple = {true}
   disableElevation = {true}>
          {props.isSubmitting ?  <CircularProgress size = {16}/>: 'Save'}

   </Button>
</Grid>

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
<Input name={CustomerName.name} label={CustomerName.label} tip={CustomerName.tip} style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={phone.name} label={phone.label} tip={phone.tip} type="tel" style={{minWidth:300}}/>
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
        <Grid item style={{marginLeft:20}}>
        <Input name={Locality.name} tip={Locality.tip} label={Locality.label} type="text"  style={{minWidth:300}}/>
</Grid>
        <Grid item style={{marginLeft:20}}>
        <Input name={Landmark.name} tip={Landmark.tip} label={Landmark.label} type="text"  style={{minWidth:300}}/>
</Grid>
        <Grid item style={{marginLeft:20}}>
        <Input name={City.name} tip={City.tip} label={City.label} type="text"  style={{minWidth:300}}/>
</Grid>
    </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <Input name={itemWeight.name} tip={itemWeight.tip} label={itemWeight.label} type="number"  style={{minWidth:300}}/>
            </Grid>
            
            <Grid item style={{marginLeft:20,alignItems:"center",justifyContent:"center",display:"flex"}}>
  </Grid>
            
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <Input name={note.name} tip={note.tip}label={note.label} type="text"  style={{minWidth:300}}/>
  </Grid>
  <Grid item style={{marginLeft:20,alignItems:"center",justifyContent:"center",display:"flex"}}>
            <CheckBox name={paymentStatus.name} tip={paymentStatus.tip} label={paymentStatus.label}  style={{minWidth:300}}/>
  </Grid>
  <Grid item style={{marginLeft:20,alignItems:"center",justifyContent:"center",display:"flex"}}>
  <Input name={PendingAmount.name} variant={!props.values.paymentStatus?"outlined":"filled"} disabled={props.values.paymentStatus} tip={PendingAmount.tip}label={PendingAmount.label} type="number"  style={{minWidth:300}}/>

  </Grid>

        </Grid>

      </Grid>
    </Grid>



    </Form>
       
       )}

    </Formik>
    </div>
    </Wrapper>
    </> );
}
