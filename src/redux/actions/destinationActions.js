import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../services/firebase';

// Action Types
export const FETCH_DESTINATIONS_SUCCESS = 'FETCH_DESTINATIONS_SUCCESS';
export const FETCH_DESTINATIONS_FAILURE = 'FETCH_DESTINATIONS_FAILURE';
export const ADD_DESTINATION = 'ADD_DESTINATION';
export const REMOVE_DESTINATION = 'REMOVE_DESTINATION';
export const SEARCH_DESTINATIONS = 'SEARCH_DESTINATIONS';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

// Action Creators
const fetchDestinationsSuccess = (destinations) => ({
  type: FETCH_DESTINATIONS_SUCCESS,
  payload: destinations,
});

const fetchDestinationsFailure = (error) => ({
  type: FETCH_DESTINATIONS_FAILURE,
  payload: error,
});

export const addDestination = (destination) => ({
  type: ADD_DESTINATION,
  payload: destination,
});

export const removeDestination = (destinationId) => ({
  type: REMOVE_DESTINATION,
  payload: destinationId,
});

export const searchDestinations = (query) => ({
    type: SEARCH_DESTINATIONS,
    payload: query,
});

export const setSearchQuery = (query) => {
    return {
      type: SEARCH_DESTINATIONS,
      payload: query,
    };
  };
  

// Async Action to Fetch Destinations
export const fetchDestinations = () => async (dispatch) => {
  try {
    const destinationsCollection = collection(firestore, 'destinations');
    const destinationsSnapshot = await getDocs(destinationsCollection);

    const destinationsData = destinationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch(fetchDestinationsSuccess(destinationsData));
  } catch (error) {
    console.error('Error fetching destinations:', error.message);
    dispatch(fetchDestinationsFailure(error.message));
  }
};
