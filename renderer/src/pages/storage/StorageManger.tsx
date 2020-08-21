import React, { useContext, useState } from 'react';
import Select from 'antd/lib/select';
import { StorageContext } from '@contexts/StorageContext';
import ShowData from './ShowData/ShowData';
import { OneStorageContext } from '@contexts/OneStorageContext';
import { ipcRenderer } from 'electron';
import { StorageComponentContext } from './Context';

const { Option } = Select;

export default function StorageManger(): JSX.Element {
  const { dispatch } = useContext(OneStorageContext);
  const StorageComponentContextDispatch = useContext(StorageComponentContext)
    .dispatch;
  const { state } = useContext(StorageContext);
  const [spinner, setSpinner] = useState(false);
  const [storageSelectd, SetStorageSelectd] = useState(false);

  function selectdStorage() {
    SetStorageSelectd(true);
  }
  function onChange(
    storageId: string,
    option: { key: string; children: string; value: string }
  ) {
    StorageComponentContextDispatch({
      type: 'setStorage',
      payload: { name: option.children, id: option.value },
    });
    setSpinner(true);
    fetchDataForStroage(storageId);
    selectdStorage();
  }

  function removeSpinner() {
    setTimeout(() => {
      setSpinner(false);
    }, 750);
  }

  function fetchDataForStroage(storageId: string) {
    ipcRenderer
      .invoke('inventory/read/one', storageId)
      .then((data) => {
        dispatch({
          type: 'sync',
          payload: data,
        });
      })
      .catch((err) => {
        // TODO display Error message
        console.error('something went wrong', err);
      })
      .finally(() => removeSpinner());
  }
  return (
    <>
      <Select
        showSearch
        style={{ width: 400 }}
        placeholder="Select a Storage"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {state.rows.map(({ dataValues: { id, inventoryName } }) => {
          return (
            <Option key={id} value={id}>
              {inventoryName}
            </Option>
          );
        })}
      </Select>
      {storageSelectd ? <ShowData spinner={spinner} /> : <PlzSelect />}
    </>
  );
}

// TODO design a better message
function PlzSelect(): JSX.Element {
  return (
    <>
      <h1>please select a storage</h1>
    </>
  );
}
