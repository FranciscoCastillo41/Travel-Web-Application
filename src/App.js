import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import your Redux store
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserProfile from './components/Profile/UserProfile';
import DestinationList from './components/Destinations/DestinationList';
import Home from './components/Home/Home';
//import CreateItinerary from './components/Itineraries/CreateItinerary';
import SavedDestinationsGallery from './components/Destinations/SavedDestinationsGallery'

function App() {
  const handleLogout = () => {
    // You can dispatch a logout action here if needed
  };

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar expand="lg" fixed="top" className="bg-light">
            <Navbar.Brand as={Link} to="/">Venture Vista</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto"> {/* Use ml-auto to move the links to the right */}
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/destinations">Featured Destinations</Nav.Link>
                <Nav.Link as={Link} to="/saved">Saved Trips</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/destinations" element={<DestinationList/>} />
            <Route path="/saved" element={<SavedDestinationsGallery/>} />
            <Route path="/profile" element={<UserProfile />} />
            {/* Other routes */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;


