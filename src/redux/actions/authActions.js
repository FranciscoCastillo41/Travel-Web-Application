import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, getFirestore, doc, setDoc, updateDoc, getDoc, arrayUnion } from '../../services/firebase';
import { updateProfile } from 'firebase/auth';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const SAVE_DESTINATION_SUCCESS = 'SAVE_DESTINATION_SUCESS';

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
    },
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
    },
});

export const loginUser = (email, password, navigate) => async (dispatch) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        dispatch(loginSuccess(user));
        navigate('/profile');
    } catch (error) {
        console.error('Login failed', error.message);
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        await auth.signOut();
        dispatch(logoutSuccess());
    } catch (error) {
        console.log('Logout failed', error.message);
    }
}

export const registerUser = (email, password, displayName, navigate) => async (dispatch) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName });

        await setDoc(doc(getFirestore(), 'userProfiles', user.uid), {
            userId: user.uid,
            email: user.email,
            displayName: displayName,
            savedDestinations: [], 
            createdItineraries: [],
            profileImage: "http://www.gravatar.com/avatar/?d=mp"
        })

        dispatch(registerSuccess(user));
        navigate('/profile');
    } catch (error) {
        console.error('Registration failed', error.message);
    }
};

export const savedDestination = (userId, destinationId) => async (dispatch) => {
    try {
        console.log('Start of savedDestination action');
        const firestore = getFirestore();
        const userRef = doc(firestore, 'userProfiles', userId);
        console.log('User reference:', userRef);

        const userDoc = await getDoc(userRef);
        console.log('User document:', userDoc);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User data:', userData);

            let savedDestinations = userData?.savedDestinations || [];

            if (!savedDestinations.includes(destinationId)) {
                savedDestinations.push(destinationId);

                await updateDoc(userRef, {
                    savedDestinations: savedDestinations,
                });

                console.log('Destination saved successfully:', destinationId);
                dispatch(savedDestinationSuccess(destinationId));
            } else {
                console.log('Destination already saved by the user.');
            }
        } else {
            console.error('User profile not found.');
        }
    } catch (error) {
        console.error('Error saving destination: ', error.message);
    }
};

const savedDestinationSuccess = (destinationId) => ({
    type: SAVE_DESTINATION_SUCCESS,
    payload: destinationId,
});