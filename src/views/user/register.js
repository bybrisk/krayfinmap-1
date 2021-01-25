import {
  CircularProgress, Typography
} from "@material-ui/core";
import axios from 'axios';
import { Form, Formik} from "formik";
import React, {
  useState
} from "react";
import { useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { domain } from "../../App";
// import useStyles from "./styles";
import '../../App.css';
import Logo from '../../Assets/logo.png';
import Button from "../../components/application/button/button";
import BusinessInformation from "../../components/user/forms/BusinessInformation";
import ByBriskDelivery from "../../components/user/forms/ByBriskDelivery";
import SelfDelivery from "../../components/user/forms/SelfDelivery";
import Signup from "../../components/user/forms/Signup";
import formInitialValues from "../../components/user/signup/formInitialValues";
import RegistrationModel from "../../components/user/signup/registrationModel";
import validationSchema from "../../components/user/signup/validationSchema";
import {CreateAccount, IsUsernameAvailable} from '../../helpers/NetworkRequest'
import {
  FormContainer,
  Wrapper
} from "../../helpers/Styles";
  
  const steps = ["Shipping address", "Payment details", "Review your order"];
  const {
    formId,
    formField
  } = RegistrationModel;
  
  function _renderStepContent(activeStep, values) {
    switch (activeStep) {
      case 0:
        return <Signup formField = {
          formField
        }
        />;
      case 1:
        return <BusinessInformation formField = {
          formField
        }
        />;
      case 2:
        return values.delivery === "bybrisk" ? ( < ByBriskDelivery formField = {
            formField
          }
          />
        ) : ( < SelfDelivery formField = {
            formField
          }
          />
        );
      default:
        return <div> Not Found </div>;
    }
  }
  
  export default function Registration(props) {
    // const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;
  
  
    async function _submitForm(values, actions) {
      const article = JSON.stringify({
        Email: values.email,
        Password: values.password,
        BusinessCategory: values.businessCategory,
        BusinessName: values.businessName,
        UserName: values.username,
        Address: values.businessAddress,
        AvgWorkingHours: values.avgWorkingHours || 12,
        DeliveryAgent: 2,
        AutoScaling: values.autoScaling,
        BybriskDelivery: (values.delivery === 'bybrisk' ? true : false),
        InstantDelivery: values.deliveryTime === '24' ? false : true,
        BusinessPlan: "1",
        longitude:values.longitude,
        latitude:values.latitude
      });
  
      CreateAccount({article,dispatch,history,actions,enqueueSnackbar})
   
    }
  
  async function _handleSubmit(values, actions) {
    actions.setSubmitting(true);
    if (isLastStep) {
        _submitForm(values, actions);
        return;
      } 
      else if(activeStep===0 && await IsUsernameAvailable({username:values.username})){
        actions.setErrors({username:"Username already Exist"})
        actions.setSubmitting(false);

      }
      else
      {
  setActiveStep(activeStep + 1);
  console.log(activeStep)

  actions.setTouched({});
        actions.setSubmitting(false);

        
      }
    }
  
  
    return ( 
    <React.Fragment >
        <Wrapper className = "wrapper"> 
        <FormContainer >
        <React.Fragment>
        <img src = {Logo} style = {{maxWidth: 140}} alt="Krayfinmap"/>
  
        <React.Fragment>
  
        <Formik initialValues = {formInitialValues}
  validationSchema = {currentValidationSchema}
  onSubmit = {_handleSubmit} >

  {(props) => (    
    <Form id={formId} style = {{
         width: '100%',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         flexDirection: 'column'
       }} > 
       {_renderStepContent(activeStep, props.values)} 
       <div style = {{
         width: "100%",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         marginTop: 20
       }} >
     <Button disabled = {props.isSubmitting}
     disableFocusRipple = {true}
     disableElevation = {true}
     type = "submit"
     variant = "outlined"
     fullwidth > 
     {}
     {props.isSubmitting ?  <CircularProgress size = {24}/> :(isLastStep ? 'Complete Signup' : 'Continue')}
      </Button> 
      
    
   </div>
  
   </Form>
  
  )}
  
   </Formik>
  
  </React.Fragment>
  
  
     {activeStep===0&&(<Typography style = {{marginTop: "10px"}} varient = "caption" >Already have a account ? {" "}
       <span style = {{
          textDecoration: "none",
          color: "#FF6F1F",
          cursor: 'pointer'}}
    onClick = {props.clickHandler} >
      Login </span> </Typography>  
  )}     </React.Fragment>
  
      </FormContainer> </Wrapper>
     
      </React.Fragment>
  );
  }