const AuthReducer = (
    state = {
      login: false,
      user: [],
      bybId: ""
    },
    action
  ) => {
    switch (action.type) {
      case "LOG_IN":
        console.log(action.payload);
        return {
          ...state,
          login: action.payload
        };
      case "ID":
        return {
          ...state,
          bybId: action.payload
        };
      case "USER":
        console.log("called", action.payload);
        return {
          ...state,
          user: action.payload
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  