const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
      break;
    case 'REGISTER_ADMIN':{
      let prevState ={...state};
      if (!action.payload.isAdmin){
        prevState.redirect = true;
        return prevState;
      }
    }
    break;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
