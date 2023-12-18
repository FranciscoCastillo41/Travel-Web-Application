import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firestore } from '../../services/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItinerariesSuccess, fetchUserItineraries } from '../../redux/actions/itineraryActions';
import { setSavedTripsCount, editDisplayName, changeProfilePhoto } from '../../redux/actions/userActions';

import { Modal, Button, Form } from 'react-bootstrap';
import '../../assets/styles/colors.css';
import '../../assets/styles/userProfile.css';

const selectSavedTripsCount = (state) => state.user.savedTripsCount;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const savedTripsCount = useSelector(selectSavedTripsCount);
  const itineraries = useSelector((state) => state.itinerary.itineraries);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    const fetchData = async () => {
      const authUser = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          resolve(user);
          unsubscribe();
        });
      });
  
      if (authUser) {
        setUser(authUser);
  
        try {
          const userProfileDoc = await getDoc(doc(firestore, 'userProfiles', authUser.uid));
  
          if (userProfileDoc.exists()) {
            const userProfileData = userProfileDoc.data();
            setUserProfile(userProfileDoc.data());

            const savedTripsCount = userProfileData.savedDestinations ? userProfileData.savedDestinations.length : 0;
            dispatch(setSavedTripsCount(savedTripsCount));
            
          } else {
            console.log('User profile not found.');
          }
  
          // Fetch itineraries for the user
          dispatch(fetchUserItineraries(authUser.uid));
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
        }
      } else if (storedUser) {
        setUser(storedUser);
      } else {
        setUser(null);
        setUserProfile(null);
        dispatch(fetchUserItinerariesSuccess([]));
      }
    };
  
    fetchData();
  }, []);

  const handleLogout = () => {
    setUser(null);
    setUserProfile(null);

    signOut(auth);

    localStorage.removeItem('user');
  };

  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');

  const [showChangePhotoModal, setShowChangePhotoModal] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState('');

  const handleShowEditNameModal = () => {
    setShowEditNameModal(true);
    setNewDisplayName(user.displayName || '');
  };

  const handleCloseEditNameModal = () => {
    setShowEditNameModal(false);
  };

  const handleShowChangePhotoModal = () => {
    setShowChangePhotoModal(true);
    setNewProfileImage(userProfile?.profileImage || '');
  };

  const handleCloseChangePhotoModal = () => {
    setShowChangePhotoModal(false);
  };

  const handleEditName = async () => {
    try {
      await dispatch(editDisplayName(user.uid, newDisplayName));
      const updatedUser = { ...user, displayName: newDisplayName };
      console.log('Updated User:', updatedUser);
      setUser(updatedUser); 
      localStorage.setItem('user', JSON.stringify(updatedUser)); 
      handleCloseEditNameModal();
    } catch (error) {
      console.error('Error updating display name:', error.message);
    }
  };
  
  const handleChangePhoto = () => {
    dispatch(changeProfilePhoto(user.uid, newProfileImage));
    handleCloseChangePhotoModal();
  };

  if (!user) {
    return (
      <div className="container mt-20">
        <p className="alert alert-danger">Please log in to view the list of destinations.</p>
        <Link to="/login" className="btn btn-primary button-accent">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-20">
      <div className="row">
        <div className="col-md-4">
          <div className="card p-4">
            <div className="text-center">
              <img
                src={userProfile?.profileImage || 'http://www.gravatar.com/avatar/?d=mp'}
                alt="Profile"
                className="rounded-circle img-fluid"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>

            <h2 className="mb-4" style={{ textAlign:'center'}}>User Profile</h2>
            <p className="lead">Name: {user?.displayName}</p>
            <p className="lead">Email: {user?.email}</p>
            <p className="lead">Saved Trips: {savedTripsCount}</p>

            <div className="mt-4">
              <Link to="/" className="btn btn-outline-primary outline me-2">
                Go to Home
              </Link>
              <button onClick={handleLogout} className="btn outline">
                Logout
              </button>
            </div>

            {/* Edit Name Button */}
            <Button variant="outline-primary" className="mt-2 outline" onClick={handleShowEditNameModal}>
              Edit Name
            </Button>

            {/* Change Photo Button */}
            <Button variant="outline-primary" className="mt-2 outline" onClick={handleShowChangePhotoModal}>
              Change Photo
            </Button>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card p-4">
            <h2 className="mb-4">My Itineraries</h2>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {itineraries.map((itinerary) => (
                <div key={itinerary.id} className="col">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="card-title">{itinerary.name}</h3>
                      <p className="card-text text-muted">{itinerary.description}</p>
                      <p className="card-text">
                        <strong>Tasks:</strong> {itinerary.tasks}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Name Modal */}
      <Modal show={showEditNameModal} onHide={handleCloseEditNameModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="New Display Name"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditNameModal} >
            Close
          </Button>
          <Button variant="primary" onClick={handleEditName} className='button-accent'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Photo Modal */}
      <Modal show={showChangePhotoModal} onHide={handleCloseChangePhotoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="New Profile Image URL"
            value={newProfileImage}
            onChange={(e) => setNewProfileImage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChangePhotoModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangePhoto}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;