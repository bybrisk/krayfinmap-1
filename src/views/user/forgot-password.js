import React from 'react'
import { Formik, Form} from "formik";
import { useSnackbar } from 'notistack';
import * as Yup from "yup";
import {Wrapper,FormContainer,StyledText,FormSetter} from 'helpers/Styles'
import Input from 'inputs/input';
import Button from 'components/application/button/button';
import CircularProgress from "@material-ui/core/CircularProgress";
import {UpdatePassword} from 'helpers/NetworkRequest'
import {useSelector} from 'react-redux'
import { Helmet } from "react-helmet";

const initialvalue = {
    newPassword: "",
    oldPassword: ""
  };
  
  const validation = Yup.object().shape({
    oldPassword: Yup.string()
    .min(7,'Password should have minimum 7 Characters')
    .required("Old Password is Required"),
    newPassword: Yup.string()
      .min(7, "Password should be min 7 characters")
      .required("Password is required")
  });
  


export default function ForgotPassword(prop) {
const {close} = prop;
  const ID = useSelector(state => state.bybId)
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (values) =>{
    const newDetails = JSON.stringify({
      oldPassword:values.oldPassword,
      newPassword:values.newPassword,
      bybID:ID
    })
    UpdatePassword({newDetails,enqueueSnackbar,close})
  }
    return (
      <>
        <Helmet>
        <title>Reset Password</title>
        <meta name="description" content="Reset Your Password"  />
      </Helmet>
   
        <Wrapper>
        {/* Hidden on small screen size leftLogo */}
        <FormContainer>
          <StyledText variant="h4">Reset Your Password</StyledText>

          <FormSetter>
            <Formik
              initialValues={initialvalue}
              validationSchema={validation}
              onSubmit={handleSubmit}
            >
              {(props) =>(
                  <Form autoComplete="false" style={{ width: "100%" }}>
                   
                  <Input name={"oldPassword"} label={'Old Password'} tip={'Old Password you Remember'}  style={{minWidth:300}}/>
                  <Input name={'newPassword'} label={'New Password'} tip={'New Password To set'}  style={{minWidth:300}}/>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20
                      }}
                    >
                      <Button
                        disableFocusRipple={true}
                        disableElevation={true}
                        type="submit"
                        variant="outlined"
                        disabled = {props.isSubmitting}                      >
                        {props.isSubmitting ? (
                          <CircularProgress
                            style={{
                              height: "20px",
                              width: "20px",
                              color: "#fff"
                            }}
                          />
                        ) : (
                          "Reset Password"
                        )}
                      </Button>
                    </div>
                  </Form>
            
              )}
            </Formik>
          </FormSetter>
        </FormContainer>
      </Wrapper>
      </>
       )
}

