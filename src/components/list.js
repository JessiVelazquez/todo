import React, { useEffect, useState } from 'react';
import { When } from 'react-if';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useHook from '../hooks/hooks.js';
import { FormControl } from 'react-bootstrap';



function ToDoList(props) {

  const [value, setValue] = useState('');
  const [id, setId] = useState('');
  const [update, setUpdate] = useState(false);
  const [handleSubmit, values] = useHook(updateList);

  const toggleUpdate = (id) => {
    setUpdate(!update);
    setId(id);
  }

  function updateList(todo) {
    setValue(todo);
    props.updateItem(id, value)
  }

  return (
    <>
      <ListGroup id="listGroup">
        {props.list.map(item => (
          <div id="listItem">
            <ListGroup.Item
              id="listGroupItem"
              className={`complete-${item.complete.toString()}`}
              key={item._id}
              onClick={() => props.toggleComplete(item._id)}
            >Attn: {item.assignee} : {item.text}
            </ListGroup.Item>
            <Button variant="primary" onClick={() => toggleUpdate(item._id)}>Update</Button>
            <Button id="deleteButton" variant="dark" type="submit" onClick={() => props.deleteItem(item._id)}>Delete</Button>
          </div>
        ))}
      </ListGroup>
      <When condition={update === true}>
        <Form>
          <FormControl placeholder="update a task" onChange={(e) => setValue(e.target.value)} />
          <Button onClick={(e) => {handleSubmit(e); toggleUpdate(id);}}>Submit</Button>
        </Form>
      </When>
    </>
  );
}

export default ToDoList;
