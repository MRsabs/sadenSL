import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types'


export const StorageContext = createContext();

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

StorageContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};