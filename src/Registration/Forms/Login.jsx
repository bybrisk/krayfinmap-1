import CircularProgress from "@material-ui/core/CircularProgress";
// Material ui
import { styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Form as FORM, Formik } from "formik";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
// import "./Professional.css";
import { domain } from "../../App";
import Button from "../../CustomComponents/ReactButton/ReactButton";
import { FormSetter, FormContainer, Wrapper, StyledText } from "../../Helpers/Styles";
import Logo from '../../Assets/logo.png'

// Styled componenst with material styled
const StyledField = styled(TextField)({
  borderRadius: "1000rem",
  marginTop: "10px"
});


//////////////////////////////

const initialvalue = {
  Password: "",
  Email: ""
};

const validation = Yup.object({
  Email: Yup.number()
    .typeError("Must specify a number")
    .positive("Please enter correct Email")
    .required("Required")
    .nullable(),
  Password: Yup.string()
    .min(7, "Password should be min 7 characters")
    .required("Password is required")
});
export default function (props) {
  console.log(props)
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { from } = { from: { pathname: "/" } };
  console.log(domain);

  const handleSubmit = (values) => {
    setLoading(true);
    const article = JSON.stringify({
      Email: values.Email,
      Password: values.Password
    });

    console.log(values);

    // axios.post('http://localhost:5000/register', article, { headers })
    //     .then(data=>console.log(data))
    //     .catch(err=>console.log(err))
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${domain}/signin`);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

    xhr.send(article);

    xhr.onload = () => {
      console.log(xhr.response);
      const data = JSON.parse(xhr.response);
      if (data.error) {
        setLoading(false);
        // notifyerror(data.error);
      } else {
        // notifysuccess("successfully signed in");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        setLoading(false);
        history.push(from);
      }
    };
  };
  return (
    <>
      <Wrapper>
        {/* Hidden on small screen size leftLogo */}
        <FormContainer>
        <img src={Logo} style={{maxWidth:140}}/>

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
                  handleBlur
                } = props;
                return (
                  <FORM autoComplete="true" style={{ width: "100%" }}>
                    <div className="container">
                      <StyledField
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Email}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        type="tel"
                        pattern="[0-9]{10}"
                        label="Email No."
                        name="Email"
                        error={errors.Email && touched.Email ? true : false}
                        helperText={
                          errors.Email && touched.Email ? errors.Email : null
                        }
                      />
                    </div>
                    <div className="container">
                      <StyledField
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Password}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        type="password"
                        label="Password"
                        name="Password"
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
                        disabled={loading ? true : false}
                      >
                        {loading ? (
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
            <a
            style={{ textDecoration: "none", color: "#FF6F1F",cursor:'pointer' }}
              onClick={props.clickHandler}
            >
              Signup
            </a>
          </Typography>

          </FormSetter>
        </FormContainer>
      </Wrapper>
    </>
  );
}
