import React, { useEffect, useState } from 'react';
import { When } from 'react-if';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
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

  return (
    <>
      <div id="listGroup">
        <When condition={update === true}>
          <Form>
            <FormControl placeholder="update task" onChange={(e) => setValue(e.target.value)} />
            <Button onClick={(e) => {handleSubmit(e); toggleUpdate(id);}}>Submit</Button>
          </Form>
        </When>
        {props.list.map(item => (
          <Card id="listItem">
            <Card.Header>
              <Badge
                pill 
                variant={item.complete === true ? 'danger' : 'success'}
                className="m-3"
                onClick={() => props.toggleComplete(item._id)}
                >
                {item.complete === true ? `Complete` : `Pending`}
              </Badge>
              <span className="mr-auto">{item.assignee}</span>
              <Button 
                variant="light" 
                type="submit" 
                onClick={() => props.deleteItem(item._id)}
                className="float-right text-secondary font-weight-bold"
                >
                  X
                </Button>
            </Card.Header>
            <Card.Body id="cardBody">
              <Card.Text
              id="taskText"
              className={`complete-${item.complete.toString()}`}
              key={item.id}
              onClick={() => toggleUpdate(item._id)}
              >
                {item.text}
              </Card.Text>
              <Card.Text id="diff" className="text-sm-right">
                Difficulty: {item.difficulty}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default ToDoList;
