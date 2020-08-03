import React, { createContext, useReducer } from 'react';

export const GlobalContext = createContext(null);

const GlobalContextReducer = (state, { type, payload }) => {
  switch (type) {
    case 'hasStorage':
      return { ...state, [type]: payload };

    default:
      return state;
  }
};

function GlobalContextProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(GlobalContextReducer, {
    hasStorage: false,
  });
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
