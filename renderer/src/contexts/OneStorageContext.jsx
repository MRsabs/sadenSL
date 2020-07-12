import React, { createContext, useReducer } from 'react';

export const OneStorageContext = createContext();

const oneStorageReducer = (state, action) => {
  switch (action.type) {
    case 'sync':
      return action.payload;
    default:
      return state;
  }
};

const OneStorageContextProvider = (props) => {
  const [oneStorage, dispatch] = useReducer(oneStorageReducer, [{}]);
  return (
    <OneStorageContext.Provider value={{ oneStorage, dispatch }}>
      {props.children}
    </OneStorageContext.Provider>
  );
};

export default OneStorageContextProvider;
