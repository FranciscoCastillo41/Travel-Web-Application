import { FETCH_USER_ITINERARIES_SUCCESS } from '../actions/itineraryActions';

const initialState = {
  itineraries: [],
};

const itineraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_ITINERARIES_SUCCESS:
      return {
        ...state,
        itineraries: action.payload,
      };
    default:
      return state;
  }
};

export default itineraryReducer;
