import React, { useEffect, useState } from 'react';
import { When } from 'react-if';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import useHook from '../hooks/hooks.js';
import { FormControl } from 'react-bootstrap';



function ToDoList(props) {

  const [value, setValue] = useState('');
  const [id, setId] = useState('');
  const [update, setUpdate] = useState(false);
  const [handleSubmit, values] = useHook(updateList);
  const [complete, setComplete] = useState('');

  const toggleUpdate = (id) => {
    setUpdate(!update);
    setId(id);
  }

  function updateList(todo) {
    setValue(todo);
    props.updateItem(id, value)
  }

  // const toggleStatus = (complete) => {
  //   console.log('BEFORE', complete);
  //   setComplete(!complete);
  //   console.log('AFTER', complete);
  //   setId(id);
  // }

  return (
    <>
      <div id="listGroup">
        {props.list.map(item => (
          <div id="listItem">
            <Toast>
              <Toast.Header>
                {/* <button variant="primary" onClick={() => toggleStatus(item.complete)}>{item.complete.toString()}</button> */}
                <strong className="mr-auto">{item.assignee}</strong>
              </Toast.Header>
              <Toast.Body>{item.text}</Toast.Body>
              <Button id="deleteButton" variant="dark" type="submit" onClick={() => props.deleteItem(item._id)}>Delete</Button>
              <Button variant="primary" onClick={() => toggleUpdate(item._id)}>Update</Button>
            </Toast>
            {/* <ListGroup.Item
              id="listGroupItem"
              className={`complete-${item.complete.toString()}`}
              key={item._id}
              onClick={() => props.toggleComplete(item._id)}
            >Attn: {item.assignee} : {item.text}
            </ListGroup.Item> */}
          </div>
        ))}
      </div>
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
