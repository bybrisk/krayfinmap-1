import React from "react";
import { Typography } from "@material-ui/core";
import ReactInput from "../../FormField/ReactInput";
import { FormSetter,StyledText } from "../../Helpers/Styles";

const Signup = (props) => {
  const {
    formField: { username, password, email }
  } = props;
  return (
    <>
          <StyledText variant="h4">Signup</StyledText>
      
        <FormSetter>
          <ReactInput
            name={username.name}
            label={username.label}
            tip={username.tip}

            type={"text"}
          />
          <ReactInput name={email.name} label={email.label} tip={email.tip}
type={"email"} />
          <ReactInput
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
