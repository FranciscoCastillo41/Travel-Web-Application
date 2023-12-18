import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDestinations } from '../../redux/actions/destinationActions';
import { savedDestination } from '../../redux/actions/authActions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { Link } from 'react-router-dom';
import { setSearchQuery } from '../../redux/actions/destinationActions';
import { Card, Button, Modal, Carousel } from 'react-bootstrap';
import '../../assets/styles/destinations.css';

import Map from '../Map/Map';

const DestinationList = () => {
  const dispatch = useDispatch();
  const destinations = useSelector((state) => state.destination.destinations);
  const [userId, setUserId] = React.useState(null);
  const error = useSelector((state) => state.destination.error);
  const query = useSelector((state) => state.destination.searchQuery);
  const [showMap, setShowMap] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUserId(authUser.uid);
        dispatch(fetchDestinations());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const handleSaveDestination = (destinationId) => {
    console.log('Saving destination:', destinationId);
    dispatch(savedDestination(userId, destinationId));
  };

  const handleShowMap = (destination) => {
    setSelectedDestination(destination);
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setSelectedDestination(null);
  };

  if (!userId) {
    return (
      <div className="container mt-20">
        <p className="alert alert-danger">Please log in to view the list of destinations.</p>
        <Link to="/login" className="btn btn-primary button-accent">
          Go to Login
        </Link>
      </div>
    );
  }

  if (error) {
    return <p>Error fetching destinations: {error}</p>;
  }

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(query.toLowerCase()) ||
      destination.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mt-12">
      <h2 className="mb-4">List of Destinations</h2>
      <input
        type="text"
        placeholder="Search destinations..."
        value={query}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="form-control mb-4"
      />
  
      <Carousel>
        {filteredDestinations.map((destination) => (
          <Carousel.Item key={destination.id}>
            <div className="overlay-container">
              <div className="dark-overlay-des"></div>
              <img
                className="d-block w-100"
                src={destination.imageURL}
                alt={destination.name}
                style={{ maxHeight: '600px', objectFit: 'cover'}}
              />
              <div className="overlay-text">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <Button
                  className="button-accent mr-2"
                  onClick={() => handleSaveDestination(destination.id)}
                  variant="primary"
                  style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white' }}
                >
                  Save
                </Button>
                <Button
                  variant="info"
                  onClick={() => handleShowMap(destination)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid white',
                    color: 'white',
                  }}
                >
                  View on Map
                </Button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
  
      <Modal show={showMap} onHide={handleCloseMap}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDestination && selectedDestination.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDestination && (
            <Map
              destinations={[selectedDestination]}
              center={[selectedDestination.latitude, selectedDestination.longitude]}
              zoom={10}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMap}>
            Close Map
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DestinationList;
