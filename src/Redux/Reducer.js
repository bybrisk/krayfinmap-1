const AuthReducer = (
    state = {
      login: false,
      user: [],
      bybId: "",
      Agents:[]
    },
    action
  ) => {
    switch (action.type) {
      case "LOG_IN":
        return {
          ...state,
          login: action.payload
        };
      case "ID":
        return {
          ...state,
          bybId: action.payload
        };
        case "AddAgent":
          let agent = state.Agents
          agent.push(action.payload)
        return {
            ...state,
            Agents: agent
          };
  
        case "USER":
        return {
          ...state,
          user: action.payload
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  