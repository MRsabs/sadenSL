import React, { useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';
import { useParams } from 'react-router-dom';
import { OneStorageContext } from '@contexts/OneStorageContext';
import ReactVirtualizedTable from './Table';

export default function OneStorage() {
  let { storageId } = useParams();
  const { oneStorage, dispatch } = useContext(OneStorageContext);
  return (
    <>
      <ReactVirtualizedTable data={oneStorage} />
    </>
  );
}
