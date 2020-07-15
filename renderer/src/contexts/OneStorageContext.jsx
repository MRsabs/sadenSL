import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types'

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


OneStorageContextProvider.propTypes = {
  children: PropTypes.element
}

export default OneStorageContextProvider;
