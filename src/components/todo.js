import React, { useEffect, useState } from 'react';
import ToDoForm from './form.js';
import ToDoList from './list.js';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import useHook from '../hooks/hooks.js';
import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


function ToDo() {

  const [list, setList] = useState([]);

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const deleteItem = (id) => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      let newList = list.filter(listItem => listItem._id !== id);
      setList(newList);
    }
  }

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }

  };

  useEffect(() => {
    let newList = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
    ];

    setList(newList);
  }, []);
 
  useEffect(() => {
    if(list.length >= 1) (document.title = `${list.filter(item => !item.complete).length} Items To Complete`)
  }, [list]);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand id="homeBlue" href="#home">Home</Navbar.Brand>
      </Navbar>
      <Navbar bg="dark" variant="dark" id="navBlack">
        <Navbar.Brand>To Do List Manager ({list.filter(item => !item.complete).length})</Navbar.Brand>
      </Navbar>

      <Card className="todo">
        <ToDoForm addItem={addItem} />
        <ToDoList
          list={list}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      </Card>
    </>
  );
}

export default ToDo;
