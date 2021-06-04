import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [hideComplete, setHideComplete] = useState(true);
  const [numItems, setNumItems] = useState(3);
  const [sortField, setSortField] = useState('difficulty');


  const state = {
    hideComplete,
    numItems,
    sortField,
    setHideComplete,
    setNumItems,
    setSortField
  }

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;
