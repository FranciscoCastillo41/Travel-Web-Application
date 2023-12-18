import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../assets/styles/itinerary.css';

const CreateItinerary = ({ show, handleClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState('');

  const handleSave = () => {
    onSave({
      name,
      description,
      tasks,
    });

    setName('');
    setDescription('');
    setTasks('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Itinerary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter itinerary name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter itinerary description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTasks">
            <Form.Label>Tasks</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter itinerary tasks"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" className="saveBtn" onClick={handleSave}>
          Save Itinerary
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateItinerary;
