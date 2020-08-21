import React, { useContext, useEffect } from 'react';
import { StorageContext } from '@contexts/StorageContext';
import { ipcRenderer } from 'electron';
import NoStorage from './noStorage/NoStorage';
import StorageManger from './StorageManger';
import OneStorageContextProvider from '@contexts/OneStorageContext';
import StorageComponentContextProvider from './Context';

export default function Storage(): JSX.Element {
  const { state, dispatch } = useContext(StorageContext);
  useEffect(() => {
    ipcRenderer.invoke('inventory/read/all').then((data) => {
      dispatch({
        type: 'sync',
        payload: data,
      });
    });
  }, []);

  if (state.count === 0) {
    return <NoStorage />;
  } else {
    return <StorageMangerWithContext />;
  }
}

function StorageMangerWithContext(): JSX.Element {
  return (
    <OneStorageContextProvider>
      <StorageComponentContextProvider>
        <StorageManger />
      </StorageComponentContextProvider>
    </OneStorageContextProvider>
  );
}
