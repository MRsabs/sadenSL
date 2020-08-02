import React, { createContext, useReducer } from 'react';

export const GlobalContext = createContext({});

const GlobalContextReducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return state;

    default:
      return state;
  }
};

function GlobalContextProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  const [global, setGlobal] = useReducer(GlobalContextReducer, {
    hasStorage: false,
  });
  return (
    <GlobalContext.Provider value={{ global, setGlobal }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
