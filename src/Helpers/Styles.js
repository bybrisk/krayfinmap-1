import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";

export const Wrapper = styled("div")({
  paddingBottom: 30,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height:'100%',
});

export const FormContainer = styled("div")({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
});

export const FormSetter = styled("div")({
  paddingTop: "40px",
  width: "90%",
  maxWidth: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
  // backgroundColor:'#46516d'
});

export const StyledText = styled(Typography)({
  textAlign: "center",
  paddingTop: "30px"
});

export const StyledField = styled(TextField)({
  borderRadius: "1000rem",
  marginTop: "10px"
});
