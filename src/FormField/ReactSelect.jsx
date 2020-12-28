import React from "react";
import PropTypes from "prop-types";
import { at } from "lodash";
import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import '../App.css'
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
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

  const { label, data, ...rest } = props;
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
    <FormControl {...rest} error={isError} className={classes.formControl}>
      <InputLabel style={{ marginLeft: 20,fontSize:'.9em',fontWeight:'normal' }}>{label}</InputLabel>
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
  );
}

SelectField.defaultProps = {
  data: []
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired
};

export default SelectField;
