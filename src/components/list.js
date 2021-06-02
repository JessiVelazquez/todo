import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/button';



function ToDoList(props) {


  return (
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
          <Button id="deleteButton" variant="dark" type="submit" onClick={() => props.deleteItem(item._id)}>X</Button>
        </div>
      ))}
    </ListGroup>
  );
}

export default ToDoList;
