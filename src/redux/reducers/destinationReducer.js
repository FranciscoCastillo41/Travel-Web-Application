import {
    FETCH_DESTINATIONS_SUCCESS,
    FETCH_DESTINATIONS_FAILURE,
    ADD_DESTINATION,
    REMOVE_DESTINATION,
    SEARCH_DESTINATIONS,
  } from '../actions/destinationActions';
  
  const initialState = {
    destinations: [],
    searchQuery: '',
    error: null,
  };
  
  const destinationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DESTINATIONS_SUCCESS:
        return {
          ...state,
          destinations: action.payload,
          error: null,
        };
  
      case FETCH_DESTINATIONS_FAILURE:
        return {
          ...state,
          destinations: [],
          error: action.payload,
        };
  
      case ADD_DESTINATION:
        return {
          ...state,
          destinations: [...state.destinations, action.payload],
          error: null,
        };
  
      case REMOVE_DESTINATION:
        return {
          ...state,
          destinations: state.destinations.filter((dest) => dest.id !== action.payload),
          error: null,
        };

      case SEARCH_DESTINATIONS:
        return {
            ...state,
            searchQuery: action.payload,
        }
  
      default:
        return state;
    }
  };
  
  export default destinationReducer;
  