import { updateDoc, doc } from "firebase/firestore";
import { firestore } from '../../services/firebase';

export const EDIT_DISPLAY_NAME_SUCCESS = 'EDIT_DISPLAY_NAME_SUCCESS';
export const CHANGE_PROFILE_PHOTO_SUCCESS = 'CHANGE_PROFILE_PHOTO_SUCCESS';
export const SET_SAVED_TRIPS_COUNT = 'SET_SAVED-TRIPS_COUNT';

export const editDisplayName = (userId, newDisplayName) => async (dispatch) => {
    try {
      await updateDoc(doc(firestore, 'userProfiles', userId), {
        displayName: newDisplayName,
      });
    } catch (error) {
      console.error('Error updating display name:', error.message);
    }
};
  
export const changeProfilePhoto = (userId, newProfileImage) => async (dispatch) => {
    try {
        await updateDoc(doc(firestore, 'userProfiles', userId), {
            profileImage: newProfileImage,
        });

        dispatch({
            type: 'CHANGE_PROFILE_PHOTO_SUCCESS',
            payload: newProfileImage,
        });
    } catch (error) {
        console.error('Error changing profile photo:', error.message);
    }
};

export const setSavedTripsCount = (count) => ({
    type: SET_SAVED_TRIPS_COUNT,
    payload: count,
})
