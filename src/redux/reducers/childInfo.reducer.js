const childInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CHILD_INFO':
      return action.payload;
    case 'UNSET_CHILD_INFO':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default childInfoReducer;