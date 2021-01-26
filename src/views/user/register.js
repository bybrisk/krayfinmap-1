import {
  CircularProgress, Typography
} from "@material-ui/core";
import { Form, Formik } from "formik";
import { useSnackbar } from 'notistack';
import React, {
  useState,Suspense
} from "react";
import Loader from "../../components/application/Loader/Loader"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import useStyles from "./styles";
import '../../App.css';
import Logo from '../../Assets/logo.png';
import Button from "../../components/application/button/button";
import Signup from "../../components/user/forms/Signup";
import formInitialValues from "../../components/user/signup/formInitialValues";
import RegistrationModel from "../../components/user/signup/registrationModel";
import validationSchema from "../../components/user/signup/validationSchema";
import { CreateAccount, IsUsernameAvailable } from '../../helpers/NetworkRequest';
import {
  FormContainer,
  Wrapper
} from "../../helpers/Styles";
const SelfDelivery = React.lazy(() =>
  import(/* webpackChunkName: "self-delivery" */ '../../components/user/forms/SelfDelivery')
);
const ByBriskDelivery = React.lazy(() =>
  import(/* webpackChunkName: "bybrisk-delivery" */ '../../components/user/forms/ByBriskDelivery')
);
const BusinessInformation = React.lazy(() =>
  import(/* webpackChunkName: "business-Information" */ '../../components/user/forms/BusinessInformation')
);

  
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

    let [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;
  
  
    async function _submitForm(values, actions) {
      actions.setSubmitting(true)
      const article = JSON.stringify({
        Email: values.email,
        Password: values.password,
        BusinessCategory: values.businessCategory,
        BusinessName: values.businessName,
        UserName: values.username,
        Address: values.Address,
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
  
  async function _handleSubmit(values,actions) {
    
    actions.setSubmitting(true);
    if (isLastStep) {
      enqueueSnackbar('Wait Sometime',{
        variant: 'warnng',
        autoHideDuration: 2000,
    })
        _submitForm(values, actions);
      } 
      else if(activeStep===0 && await IsUsernameAvailable({username:values.username})){
        actions.setErrors({username:"Username already Exist"})
        actions.setSubmitting(false);

      }
      else
      {
          setActiveStep(activeStep + 1);
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
             <Suspense fallback={<Loader/>}>
       {_renderStepContent(activeStep, props.values)} 
</Suspense>
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