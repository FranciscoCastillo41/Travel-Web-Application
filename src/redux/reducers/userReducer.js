import { SET_SAVED_TRIPS_COUNT } from "../actions/userActions";

const initialState = {
    displayName: '',
    savedTripsCount :0, 
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'EDIT_DISPLAY_NAME_SUCCESS':
        return {
          ...state,
          displayName: action.payload, 
        };
      case SET_SAVED_TRIPS_COUNT:
        return {
          ...state,
          savedTripsCount: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  