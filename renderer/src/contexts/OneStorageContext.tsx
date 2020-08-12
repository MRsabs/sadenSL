import React, { createContext, useReducer } from 'react';

export const OneStorageContext = createContext<{
  state: ProductsInfo[];
  dispatch: React.Dispatch<ReducerAction>;
}>(null);

function init(): [] {
  return [];
}

const oneStorageReducer = (state: ProductsInfo[], action: ReducerAction) => {
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
  const [state, dispatch] = useReducer(oneStorageReducer, [{}], init);
  return (
    <OneStorageContext.Provider value={{ state, dispatch }}>
      {props.children}
    </OneStorageContext.Provider>
  );
};

export default OneStorageContextProvider;

// types
export interface ProductsInfo {
  createdAt: number;
  id: string;
  'product.barcode': string;
  'product.createdAt': number;
  'product.id': string;
  'product.name': string;
  'product.retailPrice': number;
  'product.updatedAt': number;
  'product.wholeSalePrice': number;
  productId: string;
  quantityInStock: number;
  trackerId: string;
  updatedAt: number;
}

interface ReducerAction {
  type: 'sync';
  payload: ProductsInfo[];
}
