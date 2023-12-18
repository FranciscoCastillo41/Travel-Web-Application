import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CreateItinerary from '../Itineraries/CreateItinerary';
import { firestore, collection, addDoc } from '../../services/firebase';
//import { current } from '@reduxjs/toolkit';

const DestinationGallery = ({ savedDestinations, allDestinations, onDestinationClick, currentUser }) => {
  const displayedDestinations = allDestinations.filter(destination => {
    const isSaved = savedDestinations.includes(destination.destinationId.toString());
    return isSaved;
  });

  const [showItinerary, setShowItinerary] = React.useState(false);
  const [selectedDestination, setSelectedDestination] = React.useState(null);

  const handleItineraryClose = () => {
    setShowItinerary(false);
  };

  const handleItineraryShow = (destination) => {
    setSelectedDestination(destination);
    setShowItinerary(true);
  };

  // Function to add a new itinerary document to the Firestore collection
  const addItineraryToFirestore = async (itinerary) => {
    try {
      console.log('currentUser', currentUser)
      if (currentUser?.uid) {
        const userUid = currentUser.uid;

        const itineraryData = {
          ...itinerary,
          userId: userUid,
        };
  
        const itinerariesCollection = collection(firestore, 'itineraries');
        const newItineraryRef = await addDoc(itinerariesCollection, itineraryData);
  
        console.log('Itinerary added with ID:', newItineraryRef.id);
      } else {
        console.error('User information is missing or incomplete.');
      }
    } catch (error) {
      console.error('Error adding itinerary to Firestore:', error.message);
      throw error;
    }
  };
  
  const handleSaveItinerary = async (itinerary) => {
    try {
      await addItineraryToFirestore(itinerary);
      handleItineraryClose();
    } catch (error) {
      console.error('Error saving itinerary:', error.message);
    }
  };

  return (
    <div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {displayedDestinations.map((destination) => (
          <Col key={destination.destinationId}>
            <Card className="h-100" onClick={() => handleItineraryShow(destination)}>
              <Card.Img variant="top" src={destination.imageURL} alt={destination.name} />
              <Card.Body>
                <Card.Title>{destination.name}</Card.Title>
                <Card.Text>{destination.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* CreateItinerary component */}
      <CreateItinerary
        show={showItinerary}
        handleClose={handleItineraryClose}
        destination={selectedDestination}
        onSave={handleSaveItinerary}
      />
    </div>
  );
};

export default DestinationGallery;


