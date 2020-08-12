/* eslint-disable */
import React from 'react';
import { ipcRenderer } from 'electron';
import OrdersTable from './Table';

export default function Orders(): JSX.Element {
  const [state, setState] = React.useState<AllOrders[]>([]);
  React.useEffect(() => {
    ipcRenderer
      .invoke('order/read/all')
      .then((value) => setState(value))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <OrdersTable data={state} />
    </div>
  );
}

// types
interface AllOrders {
  id: string;
  createdAt: number;
  updatedAt: number;
  customerId: string;
  customerName: string;
}
