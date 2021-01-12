import React from "react";
import { FormSetter, StyledText } from "../../../helpers/Styles";
import Input from "../../../inputs/input";

const Signup = (props) => {
  const {
    formField: { username, password, email }
  } = props;
  return (
    <>
          <StyledText variant="h4">Signup</StyledText>
      
        <FormSetter>
          <Input
            name={username.name}
            label={username.label}
            tip={username.tip}

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
