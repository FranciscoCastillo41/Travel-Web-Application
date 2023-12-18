import { firestore, addDoc, collection, getDocs, serverTimestamp, query, where } from '../../services/firebase';

export const CREATE_ITINERARY_SUCCESS = 'CREATE_ITINERARY_SUCCESS';
export const FETCH_USER_ITINERARIES_SUCCESS = 'FETCH_USER_ITINERARIES_SUCCESS';

export const createItinerarySuccess = (itinerary) => ({
    type: CREATE_ITINERARY_SUCCESS,
    payload: itinerary,
});

export const fetchUserItinerariesSuccess = (itineraries) => ({
    type: FETCH_USER_ITINERARIES_SUCCESS,
    payload: itineraries,
});

export const createItinerary = (userId, itineraryData) => async (dispatch) => {
    try {
        const itineraryRef = await addDoc(collection(firestore, 'itineraries'), {
            userId,
            ...itineraryData,
            createdAt: serverTimestamp(),
        });

        const createdItinerary = {
            itineraryId: itineraryRef.id,
            userId,
            ...itineraryData,
            createdAt: new Date(),
        };

        dispatch(createItinerarySuccess(createdItinerary));
    } catch (error) {
        console.error('Error creating itinerary: ', error.message);
    }
};

export const fetchUserItineraries = (userId) => async (dispatch) => {
    try{
        const q = query(collection(firestore, 'itineraries'), where('userId', '==', userId));
        const itinerariesSnapshot = await getDocs(q);
        const itinerariesData = itinerariesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
        
        dispatch(fetchUserItinerariesSuccess(itinerariesData));
    } catch(error) {
        console.error('Error fetching user itineraries: ', error.message);
    }
}