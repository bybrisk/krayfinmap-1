import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from "@material-ui/core";

export default function CheckboxField(props) {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  function _onChange(e) {
    setValue(e.target.checked);
  }

  return (
    <FormControl {...rest} style={{ width:'100%',alignItems:'flex-start'}}>
      <FormControlLabel
        value={field.checked}
        checked={field.checked}
        labelPlacement="start"
        control={<Checkbox {...field} onChange={_onChange} />}
        label={label}
      />
      {_renderHelperText()}
    </FormControl>
  );
}
