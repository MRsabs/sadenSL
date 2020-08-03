import React, { useState, useContext } from 'react';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';
import FormOutlined from '@ant-design/icons/FormOutlined';
import Paragraph from 'antd/lib/typography/Paragraph';
import { ipcRenderer } from 'electron';
import { StorageContext } from '@contexts/StorageContext';

export default function CreateStorage(): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [storageName, setStorageName] = useState('');
  const { dispatch } = useContext(StorageContext);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    ipcRenderer
      .invoke('inventory/create', storageName)
      .then(() => setStorageName(''))
      .then(() => setVisible(false))
      .then(() => {
        ipcRenderer.invoke('inventory/read/all').then((data) => {
          dispatch({
            type: 'sync',
            payload: data,
          });
        });
      })
      .catch(() => console.error('did not create'));
  };

  const handleCancel = () => {
    setStorageName('');
    setVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create One
      </Button>
      <Modal
        title="Create a storage"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Paragraph>
          You Can Create As Much Storages As You Want Just Give Them A Unique
          Name
        </Paragraph>
        <Input
          value={storageName}
          onChange={(e) => setStorageName(e.target.value)}
          size="large"
          placeholder="Storage Name"
          prefix={<FormOutlined />}
        />
      </Modal>
    </>
  );
}
