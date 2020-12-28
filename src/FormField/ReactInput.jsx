import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
import "../App.css";
import { styled } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';

const StyledField = styled(TextField)({
  borderRadius: "1000rem",
  marginTop: "10px"
});

const ReactInput = (props) => {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);
  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }
  return (
    <div className="container">
      <StyledField
        variant="outlined"
        fullWidth
        margin="dense"
        error={meta.touched && meta.error && true}
        helperText={_renderHelperText()}
        {...field}
        {...rest}
        InputLabelProps={{
            shrink: true,
          }}
      />
    </div>
  );
};

export default ReactInput;
