import React, { createContext, useState, useReducer } from 'react';

export const StorageContext = createContext();

// const syncWithDatabase = () => {
//   ipcRenderer.callMain('inventory/read/all').then((data) => {
//     setStorage(data);
//   });
// };

const storageReducer = (state, action) => {
  switch (action.type) {
    case 'sync':
      return action.payload;
    default:
      return state;
  }
};

const StorageContextProvider = (props) => {
  const [storage, dispatch] = useReducer(storageReducer, {
    count: 0,
    rows: [],
  });

  return (
    <StorageContext.Provider value={{ storage, dispatch }}>
      {props.children}
    </StorageContext.Provider>
  );
};

export default StorageContextProvider;
