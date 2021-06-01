import React, { useEffect, useState } from 'react';


function ToDoList(props) {


  return (
    <ul>
      {props.list.map(item => (
        <li
          className={`complete-${item.complete.toString()}`}
          key={item._id}
        >
          <span onClick={() => props.toggleComplete(item._id)}>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}


export default ToDoList;
