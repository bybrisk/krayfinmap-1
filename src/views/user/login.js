import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
// Material ui
import { styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Form as FORM, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSnackbar } from 'notistack';

// import "./Professional.css";
import { domain } from "../../App";
import Logo from '../../Assets/logo.png';
import Button from "../../components/application/button/button";
import { loginAccount } from "../../helpers/NetworkRequest";
import { FormContainer, FormSetter, StyledText, Wrapper } from "../../helpers/Styles";


// Styled componenst with material styled
const StyledField = styled(TextField)({
  borderRadius: "1000rem",
  marginTop: "5px"
});


//////////////////////////////

const initialvalue = {
  Password: "",
  UserName: ""
};

const validation = Yup.object({
  UserName: Yup.string(),
    Password: Yup.string()
    .min(7, "Password should be min 7 characters")
    .required("Password is required")
});
export default function (props) {
  const dispatch = useDispatch();
  const history = useHistory();
const { from } = { from: { pathname: "/" } };
const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = (values,actions) => {
actions.setSubmitting(true)
    const article = JSON.stringify({
      UserName: values.UserName,
      Password: values.Password
    });
loginAccount({article,dispatch,history,actions,enqueueSnackbar})
  };
  return (
    <>
      <Wrapper>
        {/* Hidden on small screen size leftLogo */}
        <FormContainer>
        <img src={Logo} style={{maxWidth:140}} alt="Krayfin Map"/>

          <StyledText variant="h4">Login to Your Account</StyledText>
          
          <FormSetter>
            <Formik
              initialValues={initialvalue}
              validationSchema={validation}
              onSubmit={handleSubmit}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  isSubmitting
                } = props;
                return (
                  <FORM autoComplete="true" style={{ width: "100%" }}>
                    <div className="container">
                    <InputLabel htmlFor="input-with-icon-adornment">Email ID
            {/* <Tooltip title={tip} placement="right">
<HelpOutlineIcon style={{fontSize:'.9rem',marginLeft:5}}/>
            </Tooltip> */}
</InputLabel>
                      <StyledField
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.UserName}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        name="UserName"
                        error={errors.UserName && touched.UserName ? true : false}
                        helperText={
                          errors.UserName && touched.UserName ? errors.UserName : null
                        }
                        InputLabelProps={{
            shrink: true,
          }}
                      />
                    </div>
                    <div className="container">
                    <InputLabel htmlFor="input-with-icon-adornment">Password
            {/* <Tooltip title={tip} placement="right">
<HelpOutlineIcon style={{fontSize:'.9rem',marginLeft:5}}/>
            </Tooltip> */}
</InputLabel>

                      <StyledField
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Password}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        type="password"
                        name="Password"
                        InputLabelProps={{
            shrink: true,
          }}

                        error={
                          errors.Password && touched.Password ? true : false
                        }
                        helperText={
                          errors.Password && touched.Password
                            ? errors.Password
                            : null
                        }
                      />
                    </div>
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
                        disabled={isSubmitting ? true : false}
                      >
                        {isSubmitting ? (
                          <CircularProgress
                            style={{
                              height: "20px",
                              width: "20px",
                              color: "#fff"
                            }}
                          />
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </div>
                  </FORM>
                );
              }}
            </Formik>
            <Typography style={{ marginTop: "10px" }} varient="caption">
            Don't have a account?{" "}
            <span
            style={{ textDecoration: "none", color: "#FF6F1F",cursor:'pointer' }}
              onClick={props.clickHandler}
            >
              Signup
            </span>
          </Typography>

          </FormSetter>
        </FormContainer>
      </Wrapper>
    </>
  );
}
