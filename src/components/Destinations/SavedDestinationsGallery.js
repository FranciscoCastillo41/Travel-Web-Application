import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore, getDocs, collection, getDoc, doc } from '../../services/firebase';
//import { Link } from 'react-router-dom';
import DestinationGallery from './DestinationGallery';
import '../../assets/styles/colors.css';

const SavedDestinationsGallery = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);

        try {
          // Fetch user profile
          console.log('User ID:', authUser.uid);
          const userProfileDoc = await getDoc(doc(firestore, 'userProfiles', authUser.uid));
          setUserProfile(userProfileDoc.data());

          // Fetch destinations
          const destinationsSnapshot = await getDocs(collection(firestore, 'destinations'));
          const allDestinations = destinationsSnapshot.docs.map((doc) => ({
            destinationId: doc.id,
            ...doc.data(),
          }));

          setDestinations(allDestinations);
          setLoading(false); 
        } catch (error) {
          console.error('Error fetching data:', error.message);
          setLoading(false);
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setDestinations([]);
        setLoading(false); 
      }
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  if (!user || loading) {
    return (
      <div className="container mt-12">
        <p className="alert alert-info">Loading...</p>
      </div>
    );
  }

  console.log('Saved Destinations:', userProfile?.savedDestinations);
  console.log('All Destinations:', destinations);

  return (
    <div className="container mt-12">
      <h2 className="mb-2" >Saved Destinations</h2>
      <p>Explore your saved destinations and plan your next adventure!</p>
      <DestinationGallery
        savedDestinations={userProfile?.savedDestinations || []}
        allDestinations={destinations}
        currentUser={user}
      />
    </div>
  );
};

export default SavedDestinationsGallery;
