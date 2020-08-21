import React, { createContext, useReducer } from 'react';

export const StorageComponentContext = createContext(null);

const StorageComponentContextReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setStorage':
      return { storage: payload };

    default:
      return state;
  }
};

function StorageComponentContextProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(StorageComponentContextReducer, {
    storage: 'blayet',
  });
  return (
    <StorageComponentContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StorageComponentContext.Provider>
  );
}

export default StorageComponentContextProvider;
