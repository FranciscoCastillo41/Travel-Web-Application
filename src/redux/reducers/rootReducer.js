import { combineReducers } from 'redux';
import authReducer from './authReducer';
import destinationReducer from './destinationReducer';
import itineraryReducer from './itineraryReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  destination: destinationReducer,
  itinerary: itineraryReducer,
  user: userReducer,
});

export default rootReducer;
