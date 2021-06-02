import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import useHook from '../hooks/hooks.js';

function ToDoForm(props) {

  const [handleSubmit, handleInputChange] = useHook(props.addItem);

  function todo(e) {
    handleSubmit(e);
    handleInputChange(e);
  }

  // const [item, setItem] = useState({});


  return (
    <Card id="formCard">
      <h3>Add To Do Item</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group id="formGroupMargin">
          <Form.Label>To Do Item</Form.Label>
          <Form.Control
            name="text"
            placeholder="Add To Do List Item"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group id="formGroupMargin">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
        </Form.Group>
        <Button id="formGroupMargin" type="submit">Add Item</Button>
      </Form>
    </Card>
  );
}


export default ToDoForm;
