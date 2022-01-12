const childInfoReducer = (state = {loading:true,child:[]}, action) => {
  switch (action.type) {
    case 'SET_CHILD_INFO':{
      let prev ={...state};
      prev.child = action.payload;
      prev.loading = false;
      return prev;

    }
    case 'UNSET_CHILD_INFO':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default childInfoReducer;