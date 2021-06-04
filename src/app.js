import React from 'react';
import SettingsContext from './context/site.js';
import ToDo from './components/todo-connected.js';

function App() {
  return (
    <SettingsContext>
      <ToDo />
    </SettingsContext>
  )
}

export default App;
