import React, { createContext, useReducer } from 'react';

export const StorageContext = createContext(null);

const storageReducer = (state, action) => {
  switch (action.type) {
    case 'sync':
      return action.payload;
    default:
      return state;
  }
};

const StorageContextProvider = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(storageReducer, {
    count: 0,
    rows: [],
  });

  return (
    <StorageContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StorageContext.Provider>
  );
};

export default StorageContextProvider;
