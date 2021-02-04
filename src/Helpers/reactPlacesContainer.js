import React, { useEffect, useRef } from "react";
import { TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import { styled } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useField ,useFormikContext} from "formik";
import { at } from "lodash";
import 'App.css'
const StyledField = styled(TextField)({
  borderRadius: "1000rem",
  marginTop: "3px"
});



const GPlace = (props) => {
  const { errorText,label,tip, ...rest } = props;
  const [field, meta] = useField(props);
  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }
  const {setFieldValue } = useFormikContext();
  const placeInputRef = useRef(null);
  useEffect(() => {

    initPlaceAPI();
  }, []);

  // initialize the google place autocomplete
  const initPlaceAPI = () => {
    let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current.children[0].children[0]);
    new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace();
      placeInputRef.current.value = place.formatted_address
      setFieldValue("Address",place.formatted_address)
      setFieldValue("longitude",place.geometry.location.lng())
      setFieldValue("latitude",place.geometry.location.lat())
    });
  };
  return (
    <>
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
        autocomplete={true}
        {...rest}
        InputLabelProps={{
            shrink: true,
          }}
          ref={placeInputRef}
      />
    </div>    </>
  );
};

export default GPlace;