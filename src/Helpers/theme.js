import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";


let theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 300,
        sm: 450,
        md: 800,
        lg: 1000,
        xl: 1400
      }
    },
    palette: {
      secondary: {
        main: "#4caf50"
      },
      primary: {
        main: "#057g78"
      }
    },
    typography: {
      fontFamily: "Comic Sans MS"
    },
    
    spacing: 8,
    overrides: {
      MuiOutlinedInput: {
        root: {
          maxWidth: 400,
          borderRadius:60
        }
      },
      MuiIconButton:{
  root:{
    color:'#ffffff'
  }
      },
      MuiAccordion:{
        root:{
  background:'#061336',
  color:'#ffffff'
        }
      },
      MuiToolbar:{
  root:{
    // background:'#061336'
  }
      },
      MuiListItemIcon:{
        root:{
  color:'#ffffff'
        }
      },
      MuiFormLabel:{
  root:{
    fontSize:'1rem',
    color:'#000000'
  }
      },
   
      MuiAccordionDetails:{
  root:{
    flexDirection:'column',
    paddingLeft:"2rem",
    backgroundColor:'#142245',
    textAlign:'left'
  }
      },
      MuiDrawer:{
        paper:{
          backgroundColor:'#061336',
          color:'#ffffff'
        }
      },
      MuiTableSortLabel:{
        icon:{
  color:'#ffffff'
        }
      }	,
      MuiButton: {
        root: {
          maxWidth: 300,
          width: "100%"
        }
      },
      MuiPaper:{
        rounded:{
          borderRadius:12
        }
          },
          
    },
    
    props: {
      MuiCheckbox: {
        disableRipple: true
      }  }
  });
  
export default theme = responsiveFontSizes(theme)