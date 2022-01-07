const medicationReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MEDICATION':
      {
      let prevState =[...state];
      prevState = [...prevState, action.payload];
      return prevState;
      }
    case 'EDIT_MEDICATION':
      {
        let prevState = [...state];

      prevState = prevState.map(meds =>{
        if(meds.meds_id === action.payload[0].meds_id)
        {
      meds = action.payload[0];
        }
        return meds;
     })
      return prevState;
      }
    case 'SAVE_MEDICATION':
      return action.payload;
    case 'DELETE_MEDICATION':
      {
      // gett id from action payload, send it from the backend aswell done //

      //filter the medicine which has the id that is matching to deleted id
      let prevState = [...state]
      prevState = prevState.filter((value)=>value.meds_id!=action.payload.id)
      return prevState;
      // return the filtered state
      }
    case 'GET_MEDICATION':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default medicationReducer;
