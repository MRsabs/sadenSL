import React, { createContext, useReducer } from 'react';

export const OneStorageContext = createContext(null);

const oneStorageReducer = (state, action) => {
  switch (action.type) {
    case 'sync':
      return action.payload;
    default:
      return state;
  }
};

const OneStorageContextProvider = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(oneStorageReducer, [{}]);
  return (
    <OneStorageContext.Provider value={{ state, dispatch }}>
      {props.children}
    </OneStorageContext.Provider>
  );
};

export default OneStorageContextProvider;
