import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = createContext();

const GlobalContextReducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return state;

    default:
      return state;
  }
};

function GlobalContextProvider(props) {
  const [global, setGlobal] = useReducer(GlobalContextReducer, {
    hasStorage: false,
  });
  return (
    <GlobalContext.Provider value={{ global, setGlobal }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

GlobalContextProvider.propTypes = {
  children: PropTypes.element,
};

export default GlobalContextProvider;
