import React, { useLayoutEffect, useState } from 'react';
import { Table as AntTable } from 'antd';
import { ColumnsType } from 'antd/es/table';

function getContentSectionHeight(): number {
  return document.querySelector('#root > section > section > section > main')
    .clientHeight;
}

function GetTableHeight(ContentSectionHeight: number) {
  // ContentSectionHeight - tableHeader - TableButtom - 2 * paddingY
  const TableHeight = ContentSectionHeight - 38 - 64 - 2 * 24;
  return TableHeight;
}

const columns: ColumnsType<OrdersTableData> = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
  },
  {
    title: 'Order Time',
    dataIndex: 'orderTime',
    sorter: (a, b) => a.orderTime - b.orderTime,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
  },
];

export default function OrdersTable(props: Props): JSX.Element {
  const [tableHeight, setTableHeight] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      const newTableHeight = GetTableHeight(getContentSectionHeight());
      setTableHeight(newTableHeight);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  function dataArr(): OrdersTableData[] {
    return props.data.map(({ id, createdAt, customerId, customerName }) => ({
      key: id,
      orderId: id,
      orderTime: createdAt,
      customerId,
      customerName,
    }));
  }
  return (
    <>
      <AntTable<OrdersTableData>
        bordered={true}
        size="small"
        pagination={{ pageSize: 20 }}
        scroll={{ y: `${tableHeight}px` }}
        columns={columns}
        dataSource={dataArr()}
        onChange={onChange}
      />
    </>
  );
}

interface Props {
  data: Order[];
}

interface Order {
  id: string;
  createdAt: number;
  updatedAt: number;
  customerId: string;
  customerName: string;
}

interface OrdersTableData {
  key: string;
  orderId: string;
  orderTime: number;
  customerId: string;
}
