import {
  FormControl,
  FormHelperText, InputLabel,
  MenuItem, Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useField } from "formik";
import { at } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import '../App.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
function SelectField(props) {
  const classes = useStyles();

  const { label, data,tip, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;
  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <div className="container">

            <InputLabel htmlFor="input-with-icon-adornment">{label}
            <Tooltip title={tip} placement="right">
<HelpOutlineIcon style={{fontSize:'.9rem',marginLeft:5}}/>
            </Tooltip>

            </InputLabel>    
            <FormControl {...rest} error={isError} className={classes.formControl}>
 
             <Select
        {...field}
        value={selectedValue ? selectedValue : ""}
        variant={"outlined"}
        margin="dense"
      >
        {data.map((item, index) => (
          <MenuItem
            key={index}
            value={item.value}
            style={{ borderRadius: "12px !important" }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {_renderHelperText()}
    </FormControl>
    </div>
  );
}

SelectField.defaultProps = {
  data: []
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired
};

export default SelectField;
