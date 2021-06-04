import React, { useEffect, useState, useContext } from 'react';
import { When } from 'react-if';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import useHook from '../hooks/hooks.js';
import { FormControl } from 'react-bootstrap';
import { SettingsContext } from '../context/site.js';
import Pagination from './pagination.js';



function ToDoList(props) {
  const context = useContext(SettingsContext);

  const [value, setValue] = useState('');
  const [id, setId] = useState('');
  const [update, setUpdate] = useState(false);
  const [handleSubmit, values] = useHook(updateList);
  const [complete, setComplete] = useState('');
  const [currentPage, setCurrentPage] = useState('1');

  const toggleUpdate = (id) => {
    setUpdate(!update);
    setId(id);
  }

  function updateList(todo) {
    setValue(todo); 
    props.updateItem(id, value)
  }

  let currentList = props.list;

  //============sorting==================\\
  if (context.sortField === 'assignee') {
    currentList.sort((a, b) => {
      if (a.assignee > b.assignee) return 1;
      if (a.assignee < b.assignee) return -1;
      return 0;
    });
  }
  else if (context.sortField === 'difficulty') {
    currentList.sort((a, b) => {
      return a.difficulty - b.difficulty;
    });
  }
  else if (context.sortField === 'task') {
    currentList.sort((a, b) => {
      if (a.text > b.text) return 1;
      if (a.text < b.text) return -1;
      return 0;
    });
  }

  //=============hide completed============\\
  if (context.hideComplete) {
    currentList = props.list.filter(item => !item.complete);
  }

  //==========Get current Posts===========\\
  const indexOfLastItem = currentPage * context.numItems;
  const indexOfFirstItem = indexOfLastItem - context.numItems;
  currentList = currentList.slice(indexOfFirstItem, indexOfLastItem); 

  //============change page===============\\
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <div id="listGroup">
        <div id="settings">
          <Button
            id="hideButton"
            variant={context.hideComplete === true ? 'danger' : 'success'}
            onClick={() => context.setHideComplete(!context.hideComplete)}>
              {context.hideComplete === true ? `Show Completed Tasks` : `Hide Completed Tasks`}
          </Button>
          <div id="sortDropDown">
            <label htmlFor="sortby">Sort By:</label>
            <select name="sortby" onChange={e => context.setSortField(e.target.value)}>
              <option value="assignee">Assignee</option>
              <option value="difficulty">Difficulty</option>
              <option value="task">Task</option>
            </select>
          </div>
        </div>
        <When condition={update === true}>
          <Form>
            <FormControl placeholder="update task" onChange={(e) => setValue(e.target.value)} />
            <Button onClick={(e) => {handleSubmit(e); toggleUpdate(id);}}>Submit</Button>
          </Form>
        </When>
        {currentList.map(item => (
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
        <div id="settingsBottom">
          <Pagination itemsPerPage={context.numItems} totalItems={props.list.length} paginate={paginate}/>
          <div id="selectPerPage">
            <label htmlFor="perPage">Items Displayed Per Page:</label>
            <select name="perPage" onChange={e => context.setNumItems(e.target.value)}>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoList;
