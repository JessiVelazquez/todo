import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import ToDoForm from './form.js';
import ToDoList from './list.js';

import './todo.scss';

const todoAPI = 'https://jessi-api-server.herokuapp.com/todo'; // my API
// const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo'; // class API



const ToDo = () => {

  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };

  const deleteItem = (id) => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      let newList = list.filter(listItem => listItem._id !== id);
      setList(newList);
    }
  }

  const updateItem = (id, val) => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.text = val;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }
  }

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.json())
      .then(data => setList(data.results))
      .catch(console.error);
  };

  useEffect(_getTodoItems, []);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand id="homeBlue" href="#home">Home</Navbar.Brand>
      </Navbar>
      <Navbar bg="dark" variant="dark" id="navBlack">
        <Navbar.Brand>To Do List Manager ({list.filter(item => !item.complete).length})</Navbar.Brand>
      </Navbar>

      <Card className="todo">
        <ToDoForm addItem={_addItem} />
        <ToDoList
          list={list}
          toggleComplete={_toggleComplete}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      </Card>
    </>
  );
}

export default ToDo;
