import React from 'react'
import { Formik, Form} from "formik";
import * as Yup from "yup";
//mui
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'notistack';
import {Wrapper,StyledText} from 'helpers/Styles'
import Input from 'inputs/input';
import Checkbox from 'inputs/checkbox';
import Select from 'inputs/select';
import {UpdateAccount} from 'helpers/NetworkRequest'
import Button from 'components/application/button/button';
import 'App.css'
import {useSelector} from 'react-redux'
import { Helmet } from "react-helmet";

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
    },
    title:{
      marginBottom:'2rem'
    }
  }));

const validation = Yup.object().shape({
    UserName: Yup.string()
    .min(3, "UserName should have min 10 characters")
    .max(1000, "UserName can have max 1000 characters")
    .required("required"),
    Email: Yup.string()
    .min(9, "Password should be min 7 characters")
    .matches(
      "(?!test@test.com$)[a-z0-9._%+-]{3,}@[a-z]{3,}[a-z]{2,}(?:[a-z]{2,})?"
    )
    .required("Required"),
    BusinessName: Yup.string()
    .min(3, "Buisness Name should be min 3 characters")
    .max(1000, "Buisness Name can have max 1000 characters")
    .required("required"),
    Address: Yup.string()
    .min(10, "Address should have min 10 characters")
    .max(1000, "Address can have max 1000 characters")
    .required("required"),

})

const deliveryType = [
    {
      value: undefined,
      label: "None"
    },
    {
      value: "self",
      label: "Self Delivery"
    },
    {
      value: "bybrisk",
      label: "ByBrisk Delivery"
    }
  ];

  const agentDeliveryTime = [
    {
      value: undefined,
      label: "None"
    },
    {
      value: "24",
      label: "24 Hour"
    },
    {
      value: "1",
      label: "1 Hour"
    }];

export default function ModifyAccount(prop){
  const {close} = prop;
    const classes = useStyles();
    const user = useSelector(state => state.user)
    const { enqueueSnackbar } = useSnackbar();
    const initialvalue = user && user.DeliveryConfig ? {
        Address:user.Address,
        BusinessName:user.BusinessName,
        BybID:user.bybID,
        AutoScaling:user.DeliveryConfig.AutoScaling,
        AvgWorkingHours:user.DeliveryConfig.AvgWorkingHours,
        Delivery:user.DeliveryConfig.BybriskDelivery?"bybrisk":"self",
        DeliveryAgent:user.DeliveryConfig.DeliveryAgent,
        DeliveryTime:user.DeliveryConfig.InstantDelivery?'1':'24',
        Email:user.Email,
        PicURL:user.PicURL,
        UserName:user.UserName
    }: {}


    const [pic,setFile] = React.useState(initialvalue.PicURL)
    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
      };

      const handleSubmit = (values) =>{
const newDetails = JSON.stringify({
    Address: values.Address,
BusinessName:values.BusinessName,
BybID: values.BybID,
AutoScaling:values.AutoScaling,
AvgWorkingHours: values.AvgWorkingHours,
BybriskDelivery: (values.delivery === 'bybrisk' ? true : false),
DeliveryAgent: 0,
InstantDelivery: values.deliveryTime === '24' ? false : true,
Email: values.Email,
PicURL:pic,
UserName:values.UserName
})

UpdateAccount({newDetails,enqueueSnackbar,close})
      }
      
    return (
      <>
        <Helmet>
        <title>Modify Account</title>
        <meta name="description" content="Modify Account details"  />
      </Helmet>
   
        <Wrapper className="wrapper" style={{padding:'30px 30px',justifyContent:'flex-start'}}>
        {/* Hidden on small screen size leftLogo */}
      {user && user.DeliveryConfig ?( <div className={["flex","align-start"]}>
          <StyledText variant="h4" className={classes.title}>Update Account</StyledText>

            <Formik
              initialValues={initialvalue}
              validationSchema={validation}
              onSubmit={handleSubmit}
            >
              {(props) =>(
                  <Form autoComplete="false" id={"modifyAccount"} 
                  style={{width:'100%',display:'flex',justifyContent:'center',
                  alignItems:'center',flexDirection:'column'}}>
                   
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
            <Input name={"UserName"} label={'User Name'} tip={'UserName'}  style={{minWidth:300}}/>
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <Input name={'BusinessName'} label={'Business Name'} tip={'BusinessName'}  style={{minWidth:300}}/>
            </Grid>

            <Grid item style={{marginLeft:20}}>
            <Input name={'Email'} label={'Email'} tip={'Email'}  style={{minWidth:300}}/>
  </Grid>
            
        </Grid>

        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <Select name={"Delivery"} label={"Delivery"} data={deliveryType} tip={'If you Need Agents'} />
            </Grid>
            <Grid item style={{marginLeft:20}}>
            <Select name={"DeliveryTime"} label={"DeliveryTime"} data={agentDeliveryTime} tip={'Speed of Deliveries'}/>
  </Grid>
  <Grid item style={{marginLeft:20}}>
            <Checkbox name={"AutoScaling"} label={"AutoScaling"} tip={'Required When Have Overload'}/>
  </Grid>
   
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20,width:'100%'}}>
            <Input name={'Address'} label={'Address'} tip={'Address'}  style={{minWidth:300}}/>
            </Grid>
        </Grid>
        <Grid container justify="left" spacing={4}>
            <Grid item style={{marginLeft:20}}>
            <Input name={'AvgWorkingHours'} label={'Average Working Hours'} tip={'AvgWorkingHours'}  style={{minWidth:300}}/>
            </Grid>
      
        </Grid>

      </Grid>
    </Grid>

                </Form>
            
              )}
            </Formik>
        </div>
   ):(
     <>
       sorry their might be connection issue
     </>
   ) }
          </Wrapper>
          </>
         )
}
