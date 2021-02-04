import React,{useRef} from "react";
import { FormSetter, StyledText } from "helpers/Styles";
import Input from "inputs/input";
import { Helmet } from "react-helmet";

const Signup = (props) => {
const usernameRef = useRef(null);

  const {
    formField: { username, password, email }
  } = props;
  return (
    <>
      <Helmet>
        <title>Register your account</title>
        <meta name="description" content="Fill your basic info"  />
      </Helmet>
   
          <StyledText variant="h4">Signup</StyledText>
      
        <FormSetter>
          <Input
            name={username.name}
            label={username.label}
            tip={username.tip}
ref={usernameRef}
            type={"text"}
          />
          <Input name={email.name} label={email.label} tip={email.tip}
type={"email"} />
          <Input
            name={password.name}
            label={password.label}
            type={"password"}
            tip={password.tip}
          />
        </FormSetter>
        
        </>
  );
};

export default Signup;
