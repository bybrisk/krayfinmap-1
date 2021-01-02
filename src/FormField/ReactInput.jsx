import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import "../App.css";
import { styled } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';

const StyledField = styled(TextField)({
  borderRadius: "1000rem",
  marginTop: "3px"
});

const ReactInput = (props) => {
  const { errorText,label,tip , ...rest } = props;
  const [field, meta] = useField(props);
  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }
  return (
    <div className="container">
            <InputLabel htmlFor="input-with-icon-adornment">{label}
            <Tooltip title={tip} placement="right">
<HelpOutlineIcon style={{fontSize:'.9rem',marginLeft:5}}/>
            </Tooltip>

            </InputLabel>
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
